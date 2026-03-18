const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function getWorkspaceId(cwd) {
  return crypto.createHash("sha256").update(path.resolve(cwd)).digest("hex").slice(0, 12);
}

function getStateRoot() {
  if (process.env.OPENCODE_ONBOARDING_HOME) {
    return process.env.OPENCODE_ONBOARDING_HOME;
  }
  return path.join(os.homedir(), ".opencode", "onboarding");
}

function canUseStateRoot(rootPath) {
  const probeDir = path.join(rootPath, ".probe");
  const probeFile = path.join(probeDir, "write-test.tmp");
  try {
    fs.mkdirSync(probeDir, { recursive: true });
    fs.writeFileSync(probeFile, "ok");
    fs.unlinkSync(probeFile);
    return true;
  } catch {
    return false;
  } finally {
    try {
      fs.rmSync(probeDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup failures for the probe path.
    }
  }
}

function resolveStateRoot(cwd) {
  const preferredRoot = getStateRoot();
  if (canUseStateRoot(preferredRoot)) {
    return preferredRoot;
  }
  return path.join(cwd, ".opencode-local", "onboarding");
}

function getWorkspaceStateDir(cwd) {
  return path.join(resolveStateRoot(cwd), getWorkspaceId(cwd));
}

function getProgressPath(cwd) {
  return path.join(getWorkspaceStateDir(cwd), "progress.json");
}

function getRatingsPath(cwd) {
  return path.join(getWorkspaceStateDir(cwd), "ratings.ndjson");
}

function getFeedbackPath(cwd) {
  return path.join(getWorkspaceStateDir(cwd), "feedback.ndjson");
}

function getExportsDir(cwd) {
  return path.join(getWorkspaceStateDir(cwd), "exports");
}

function getDiagnosticsDir(cwd) {
  return path.join(getWorkspaceStateDir(cwd), "diagnostics");
}

function appendNdjson(filePath, record) {
  fs.appendFileSync(filePath, `${JSON.stringify(record)}\n`);
}

function loadManifest(cwd) {
  return readJson(path.join(cwd, "manifest.json"));
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readJson(filePath);
}

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return loadText(filePath);
}

function saveProgress(cwd, progress) {
  ensureDir(getWorkspaceStateDir(cwd));
  writeJson(getProgressPath(cwd), {
    ...progress,
    updatedAt: new Date().toISOString()
  });
}

function loadText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function getModuleIndex(manifest, moduleId) {
  return manifest.modules.findIndex((module) => module.id === moduleId);
}

function getModuleById(manifest, moduleId) {
  return manifest.modules.find((module) => module.id === moduleId) || null;
}

function getCurrentModule(manifest, progress) {
  return getModuleById(manifest, progress.currentModuleId);
}

function getDisplayTitle(module) {
  return module ? module.title : "Current module";
}

function getNextModule(manifest, moduleId) {
  const index = getModuleIndex(manifest, moduleId);
  if (index === -1 || index === manifest.modules.length - 1) {
    return null;
  }
  return manifest.modules[index + 1];
}

function getPreviousModule(manifest, moduleId) {
  const index = getModuleIndex(manifest, moduleId);
  if (index <= 0) {
    return null;
  }
  return manifest.modules[index - 1];
}

function markUnique(list, value) {
  if (!list.includes(value)) {
    list.push(value);
  }
}

function createInitialProgress(manifest) {
  return {
    version: manifest.version,
    currentModuleId: manifest.modules[0].id,
    nextModuleId: null,
    completedModuleIds: [],
    completedExerciseModuleIds: [],
    skippedModuleIds: [],
    pendingFeedbackModuleId: null,
    exerciseSession: null,
    hasCompletedOnboardingBefore: false,
    lastStepId: "intro",
    updatedAt: new Date().toISOString()
  };
}

function initializeProgress(cwd, manifest) {
  const stateDir = getWorkspaceStateDir(cwd);
  ensureDir(stateDir);
  ensureDir(getExportsDir(cwd));
  ensureDir(getDiagnosticsDir(cwd));
  const progressPath = getProgressPath(cwd);
  if (!fs.existsSync(progressPath)) {
    const progress = createInitialProgress(manifest);
    writeJson(progressPath, progress);
    return progress;
  }
  return readJson(progressPath);
}

function readProgress(cwd, manifest) {
  const progressPath = getProgressPath(cwd);
  if (!fs.existsSync(progressPath)) {
    return initializeProgress(cwd, manifest);
  }
  try {
    return readJson(progressPath);
  } catch {
    const progress = createInitialProgress(manifest);
    writeJson(progressPath, progress);
    return progress;
  }
}

function restartProgress(cwd, manifest) {
  const progress = createInitialProgress(manifest);
  saveProgress(cwd, progress);
  return progress;
}

function appendRating(cwd, { moduleId, rating }) {
  ensureDir(getWorkspaceStateDir(cwd));
  appendNdjson(getRatingsPath(cwd), {
    timestamp: new Date().toISOString(),
    moduleId,
    rating
  });
}

function appendFeedback(cwd, feedback) {
  ensureDir(getWorkspaceStateDir(cwd));
  appendNdjson(getFeedbackPath(cwd), {
    timestamp: new Date().toISOString(),
    ...feedback
  });
}

function readNdjson(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function exportFeedback(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const targetModuleId = progress.pendingFeedbackModuleId || progress.currentModuleId;
  const feedback = readNdjson(getFeedbackPath(cwd));
  const ratings = readNdjson(getRatingsPath(cwd));
  const currentModuleRating = ratings.filter((entry) => entry.moduleId === targetModuleId).at(-1);
  const currentModuleFeedback = feedback.filter((entry) => entry.moduleId === targetModuleId);
  ensureDir(getExportsDir(cwd));
  const exportPath = path.join(
    getExportsDir(cwd),
    `feedback-${targetModuleId}.txt`
  );

  const lines = [
    `Module: ${targetModuleId}`,
    `Rating: ${currentModuleRating ? currentModuleRating.rating : "not provided"}`,
    "Feedback:"
  ];

  if (currentModuleFeedback.length === 0) {
    lines.push("- No freeform feedback captured yet.");
  } else {
    for (const entry of currentModuleFeedback) {
      lines.push(`- ${entry.message}`);
    }
  }

  lines.push(`Survey link: ${manifest.surveyUrl}`);
  fs.writeFileSync(exportPath, `${lines.join("\n")}\n`);
  return exportPath;
}

function completeCurrentModule(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const currentModule = getCurrentModule(manifest, progress);
  markUnique(progress.completedModuleIds, currentModule.id);
  progress.pendingFeedbackModuleId = currentModule.id;
  progress.exerciseSession = null;
  progress.lastStepId = "complete";
  const nextModule = getNextModule(manifest, currentModule.id);
  if (nextModule) {
    progress.nextModuleId = nextModule.id;
  } else {
    progress.nextModuleId = null;
    progress.hasCompletedOnboardingBefore = true;
  }
  saveProgress(cwd, progress);
  return {
    progress,
    completedModule: currentModule,
    nextModule
  };
}

function skipCurrentModule(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  if (!progress.hasCompletedOnboardingBefore) {
    return {
      allowed: false,
      reason: "skip_locked_until_repeat",
      progress
    };
  }

  const currentModule = getCurrentModule(manifest, progress);
  markUnique(progress.skippedModuleIds, currentModule.id);
  progress.pendingFeedbackModuleId = null;
  progress.exerciseSession = null;
  progress.lastStepId = "skipped";
  progress.nextModuleId = null;
  const nextModule = getNextModule(manifest, currentModule.id);
  if (nextModule) {
    progress.currentModuleId = nextModule.id;
  }
  saveProgress(cwd, progress);
  return {
    allowed: true,
    progress,
    skippedModule: currentModule,
    nextModule
  };
}

function moveToNextModule(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const nextModule = progress.nextModuleId
    ? getModuleById(manifest, progress.nextModuleId)
    : null;

  if (!nextModule) {
    return {
      moved: false,
      progress
    };
  }

  progress.currentModuleId = nextModule.id;
  progress.nextModuleId = null;
  progress.pendingFeedbackModuleId = null;
  progress.exerciseSession = null;
  progress.lastStepId = "intro";
  saveProgress(cwd, progress);
  return {
    moved: true,
    progress,
    nextModule
  };
}

function moveToPreviousModule(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const previousModule = getPreviousModule(manifest, progress.currentModuleId);
  if (!previousModule) {
    return {
      moved: false,
      progress
    };
  }
  progress.currentModuleId = previousModule.id;
  progress.nextModuleId = null;
  progress.pendingFeedbackModuleId = null;
  progress.exerciseSession = null;
  progress.lastStepId = "revisit";
  saveProgress(cwd, progress);
  return {
    moved: true,
    progress,
    previousModule
  };
}

function getModuleContentPaths(cwd, module) {
  return {
    modulePath: path.join(cwd, module.file),
    exercisePath: module.exercise ? path.join(cwd, module.exercise) : null
  };
}

function loadOrgProfile(cwd) {
  const orgDir = path.join(cwd, "org");
  const contextPath = path.join(orgDir, "org-context.md");
  const contextTemplatePath = path.join(orgDir, "org-context.template.md");
  const approvedMcpsPath = path.join(orgDir, "approved-mcps.json");
  const approvedMcpsTemplatePath = path.join(orgDir, "approved-mcps.template.json");
  const escalationPath = path.join(orgDir, "escalation.md");
  const escalationTemplatePath = path.join(orgDir, "escalation.template.md");

  const context = readTextIfExists(contextPath) || readTextIfExists(contextTemplatePath) || "";
  const escalation = readTextIfExists(escalationPath) || readTextIfExists(escalationTemplatePath) || "";
  const approvedMcps =
    readJsonIfExists(approvedMcpsPath) ||
    readJsonIfExists(approvedMcpsTemplatePath) ||
    { mcpServers: [] };

  return {
    hasOrgContext: fs.existsSync(contextPath),
    hasApprovedMcps: fs.existsSync(approvedMcpsPath),
    hasEscalation: fs.existsSync(escalationPath),
    context,
    escalation,
    approvedMcps
  };
}

function renderOrgStubSummary(orgProfile) {
  const approvedCount = Array.isArray(orgProfile.approvedMcps.mcpServers)
    ? orgProfile.approvedMcps.mcpServers.length
    : 0;

  const lines = [
    "Organization setup",
    `- org guidance: ${orgProfile.hasOrgContext ? "configured" : "using stub content"}`,
    `- approved MCP list: ${orgProfile.hasApprovedMcps ? "configured" : "using stub content"} (${approvedCount} entries)`,
    `- escalation path: ${orgProfile.hasEscalation ? "configured" : "using stub content"}`
  ];

  if (!orgProfile.hasOrgContext || !orgProfile.hasApprovedMcps || !orgProfile.hasEscalation) {
    lines.push("- some enterprise details are still placeholders and should be filled in before rollout");
  }

  return lines.join("\n");
}

function renderCurrentModule(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const module = getCurrentModule(manifest, progress);
  const index = getModuleIndex(manifest, module.id);
  const { modulePath, exercisePath } = getModuleContentPaths(cwd, module);
  const moduleBody = loadText(modulePath).trim();
  const exerciseBody = exercisePath ? loadText(exercisePath).trim() : "";
  const isRepeatRun = progress.hasCompletedOnboardingBefore;
  const orgProfile = loadOrgProfile(cwd);

  const lines = [
    `Module ${index + 1} of ${manifest.modules.length}: ${module.title}`,
    "",
    "Let's walk through this one together.",
    "The goal is not to memorize terms. The goal is to leave with a clear mental model you can actually use at work.",
    "",
    renderOrgStubSummary(orgProfile),
    "",
    moduleBody,
    "",
    "Exercise",
    "",
    exerciseBody,
    "",
    "Questions are welcome at any time. After this module, rate it from 1 to 5 and use /feedback if you'd like to share more.",
    "When you're ready, use: exercise",
    "After the exercise, finish the module with: complete"
  ];

  if (progress.pendingFeedbackModuleId) {
    lines.push("");
    lines.push(`You still have module feedback open for: ${progress.pendingFeedbackModuleId}`);
    lines.push("Use: rate <1-5>, feedback <message>, or export-feedback");
    if (progress.nextModuleId) {
      lines.push("Then continue with: next");
    }
  }

  if (isRepeatRun) {
    lines.push("Because you've completed onboarding before, you can also use: skip");
  }

  lines.push("You can revisit the previous module with: prev");

  return lines.join("\n");
}

function renderReturnHint(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const currentModule = getCurrentModule(manifest, progress);
  const lines = [];

  if (progress.pendingFeedbackModuleId && progress.nextModuleId) {
    const feedbackModule = getModuleById(manifest, progress.pendingFeedbackModuleId);
    const nextModule = getModuleById(manifest, progress.nextModuleId);
    lines.push(`You are wrapping up: ${getDisplayTitle(feedbackModule)}.`);
    lines.push(`Next recommended step: next`);
    lines.push(`Then you'll continue with: ${getDisplayTitle(nextModule)}.`);
    lines.push("If you want the lesson back on screen first, use: show");
    return lines.join("\n");
  }

  if (progress.pendingFeedbackModuleId) {
    const feedbackModule = getModuleById(manifest, progress.pendingFeedbackModuleId);
    lines.push(`You still have feedback open for: ${getDisplayTitle(feedbackModule)}.`);
    lines.push("Next recommended step: export-feedback");
    lines.push("If you are finished, use: next");
    return lines.join("\n");
  }

  lines.push(`You are currently in: ${getDisplayTitle(currentModule)}.`);
  lines.push("Next recommended step: complete");
  lines.push("If you want the lesson back on screen, use: show");
  return lines.join("\n");
}

function exportDiagnostics(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  ensureDir(getDiagnosticsDir(cwd));
  const exportPath = path.join(
    getDiagnosticsDir(cwd),
    `diagnostic-${new Date().toISOString().replaceAll(":", "-")}.json`
  );

  const diagnostics = {
    generatedAt: new Date().toISOString(),
    workspaceId: getWorkspaceId(cwd),
    onboardingVersion: manifest.version,
    currentModuleId: progress.currentModuleId,
    completedModules: progress.completedModuleIds,
    statePresent: fs.existsSync(getProgressPath(cwd)),
    ratingsPresent: fs.existsSync(getRatingsPath(cwd)),
    feedbackPresent: fs.existsSync(getFeedbackPath(cwd)),
    redactionNotice: "Diagnostics exclude secrets, credentials, prompt history, and raw internal document content."
  };

  writeJson(exportPath, diagnostics);
  return exportPath;
}

module.exports = {
  appendFeedback,
  appendRating,
  completeCurrentModule,
  exportDiagnostics,
  exportFeedback,
  getCurrentModule,
  getModuleById,
  getWorkspaceId,
  initializeProgress,
  loadManifest,
  loadOrgProfile,
  moveToNextModule,
  moveToPreviousModule,
  readProgress,
  renderCurrentModule,
  renderReturnHint,
  saveProgress,
  restartProgress,
  skipCurrentModule
};
