const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  appendFeedback,
  appendRating,
  completeCurrentModule,
  exportDiagnostics,
  exportFeedback,
  initializeProgress,
  loadManifest,
  loadOrgProfile,
  moveToNextModule,
  readProgress,
  renderCurrentModule,
  renderReturnHint,
  restartProgress,
  skipCurrentModule
} = require("../archive/cli/lib/onboarding");
const { answerQuestion } = require("../archive/cli/lib/facilitator");
const {
  handleExerciseResponse,
  startExerciseSession
} = require("../archive/cli/lib/exercises");

function makeTempHome() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "opencode-onboarding-"));
}

function withTempHome(run) {
  const previous = process.env.OPENCODE_ONBOARDING_HOME;
  const tempHome = makeTempHome();
  process.env.OPENCODE_ONBOARDING_HOME = tempHome;
  try {
    run(tempHome);
  } finally {
    process.env.OPENCODE_ONBOARDING_HOME = previous;
  }
}

const cwd = path.resolve(__dirname, "..");

test("initializeProgress creates a first-run state", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    const progress = initializeProgress(cwd, manifest);
    assert.equal(progress.currentModuleId, "01-welcome");
    assert.deepEqual(progress.completedModuleIds, []);
  });
});

test("readProgress recovers from a missing state by initializing one", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    const progress = readProgress(cwd, manifest);
    assert.equal(progress.currentModuleId, "01-welcome");
  });
});

test("restartProgress resets the learner to the first module", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const restarted = restartProgress(cwd, manifest);
    assert.equal(restarted.currentModuleId, "01-welcome");
  });
});

test("completeCurrentModule records closeout state before moving forward", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const result = completeCurrentModule(cwd, manifest);
    assert.equal(result.completedModule.id, "01-welcome");
    assert.equal(result.nextModule.id, "02-what-ai-is-doing");

    const progress = readProgress(cwd, manifest);
    assert.equal(progress.currentModuleId, "01-welcome");
    assert.equal(progress.nextModuleId, "02-what-ai-is-doing");
    assert.equal(progress.pendingFeedbackModuleId, "01-welcome");
    assert.deepEqual(progress.completedModuleIds, ["01-welcome"]);
  });
});

test("moveToNextModule advances after module closeout", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    completeCurrentModule(cwd, manifest);
    const result = moveToNextModule(cwd, manifest);
    assert.equal(result.moved, true);
    assert.equal(result.nextModule.id, "02-what-ai-is-doing");

    const progress = readProgress(cwd, manifest);
    assert.equal(progress.currentModuleId, "02-what-ai-is-doing");
    assert.equal(progress.nextModuleId, null);
    assert.equal(progress.pendingFeedbackModuleId, null);
  });
});

test("skipCurrentModule is blocked until the learner has completed onboarding once", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const result = skipCurrentModule(cwd, manifest);
    assert.equal(result.allowed, false);
    assert.equal(result.reason, "skip_locked_until_repeat");
  });
});

test("loadOrgProfile reads the PH stub org configuration", () => {
  const profile = loadOrgProfile(cwd);
  assert.equal(profile.hasOrgContext, true);
  assert.equal(profile.hasApprovedMcps, true);
  assert.equal(profile.hasEscalation, true);
  assert.equal(profile.approvedMcps.mcpServers.length, 1);
});

test("renderCurrentModule includes the org setup summary", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const output = renderCurrentModule(cwd, manifest);
    assert.match(output, /Organization setup/);
    assert.match(output, /approved MCP list/);
  });
});

test("renderReturnHint gives the learner a clear way back after closeout", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    completeCurrentModule(cwd, manifest);
    const hint = renderReturnHint(cwd, manifest);
    assert.match(hint, /You are wrapping up/);
    assert.match(hint, /Next recommended step: next/);
  });
});

test("answerQuestion explains a general AI topic in plain language first", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const answer = answerQuestion(cwd, manifest, "What is MCP?");
    assert.match(answer, /Plain-English answer:/);
    assert.match(answer, /MCP/);
  });
});

test("answerQuestion redirects internal policy questions to org guidance", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const answer = answerQuestion(cwd, manifest, "What is our internal policy for approved use?");
    assert.match(answer, /internal business, policy, or approval question/i);
    assert.match(answer, /Placeholder contact needed/);
  });
});

test("startExerciseSession opens the guided exercise for the current module", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    const result = startExerciseSession(cwd, manifest);
    assert.equal(result.available, true);
    assert.match(result.lines.join("\n"), /Exercise:/);
    assert.match(result.lines.join("\n"), /Step 1 of 3/);
  });
});

test("handleExerciseResponse advances through the welcome exercise and marks it complete", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    startExerciseSession(cwd, manifest);

    let result = handleExerciseResponse(cwd, manifest, "I want to feel confident using this safely.");
    assert.equal(result.active, true);
    assert.match(result.lines.join("\n"), /Step 2 of 3/);

    result = handleExerciseResponse(cwd, manifest, "done");
    assert.equal(result.active, true);
    assert.match(result.lines.join("\n"), /Step 3 of 3/);

    result = handleExerciseResponse(cwd, manifest, "Both, but the human stays responsible.");
    assert.equal(result.active, false);
    assert.match(result.lines.join("\n"), /completed the interactive exercise/i);

    const progress = readProgress(cwd, manifest);
    assert.deepEqual(progress.completedExerciseModuleIds, ["01-welcome"]);
    assert.equal(progress.exerciseSession, null);
  });
});

test("feedback export includes the current module rating and notes", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    completeCurrentModule(cwd, manifest);
    appendRating(cwd, { moduleId: "01-welcome", rating: 4 });
    appendFeedback(cwd, {
      moduleId: "01-welcome",
      category: "clarity",
      message: "This felt welcoming.",
      channel: "terminal"
    });
    const exportPath = exportFeedback(cwd, manifest);
    const text = fs.readFileSync(exportPath, "utf8");
    assert.match(text, /Module: 01-welcome/);
    assert.match(text, /Rating: 4/);
    assert.match(text, /This felt welcoming\./);
  });
});

test("diagnostics export avoids raw feedback text and includes a redaction notice", () => {
  withTempHome(() => {
    const manifest = loadManifest(cwd);
    initializeProgress(cwd, manifest);
    appendFeedback(cwd, {
      moduleId: "01-welcome",
      category: "bug",
      message: "A private note that should not appear in diagnostics.",
      channel: "terminal"
    });
    const exportPath = exportDiagnostics(cwd, manifest);
    const text = fs.readFileSync(exportPath, "utf8");
    assert.match(text, /redactionNotice/);
    assert.doesNotMatch(text, /private note/i);
  });
});
