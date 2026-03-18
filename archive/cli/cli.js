#!/usr/bin/env node

const readline = require("node:readline");
const {
  getWorkspaceId,
  loadManifest,
  readProgress,
  initializeProgress,
  restartProgress,
  appendRating,
  appendFeedback,
  completeCurrentModule,
  exportFeedback,
  exportDiagnostics,
  moveToNextModule,
  moveToPreviousModule,
  renderCurrentModule,
  renderReturnHint,
  skipCurrentModule
} = require("./lib/onboarding");
const {
  answerQuestion,
  renderHelpText,
  renderSessionWelcome
} = require("./lib/facilitator");
const {
  cancelExerciseSession,
  handleExerciseResponse,
  startExerciseSession
} = require("./lib/exercises");

function print(message = "") {
  process.stdout.write(`${message}\n`);
}

function getMessageArg(args) {
  return args.join(" ").trim();
}

function parseRating(value) {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null;
  }
  return rating;
}

function printModuleCloseout(manifest) {
  print("");
  print("Module complete.");
  print("Please rate this module with: rate <1-5>");
  print("Share extra thoughts with: feedback <message>");
  print("Create a copy/paste feedback block with: export-feedback");
  print(`Survey link: ${manifest.surveyUrl}`);
}

function createContext() {
  const cwd = process.cwd();
  const manifest = loadManifest(cwd);
  const workspaceId = getWorkspaceId(cwd);
  return { cwd, manifest, workspaceId };
}

function withReturnHint(context, lines) {
  return [...lines, "", renderReturnHint(context.cwd, context.manifest)];
}

function executeCommand(context, command, args = []) {
  const { cwd, manifest, workspaceId } = context;

  if (command === "start") {
    initializeProgress(cwd, manifest);
    return {
      ok: true,
      lines: [
        `OpenCode onboarding is ready for workspace ${workspaceId}.`,
        "",
        renderCurrentModule(cwd, manifest)
      ]
    };
  }

  if (command === "interactive") {
    initializeProgress(cwd, manifest);
    return {
      ok: true,
      lines: [
        renderSessionWelcome(),
        "",
        renderCurrentModule(cwd, manifest),
        "",
        "Type `help` for commands, or ask a question in plain language."
      ]
    };
  }

  if (command === "resume") {
    readProgress(cwd, manifest);
    return {
      ok: true,
      lines: [renderCurrentModule(cwd, manifest)]
    };
  }

  if (command === "status") {
    const progress = readProgress(cwd, manifest);
    return {
      ok: true,
      lines: [
        `Workspace: ${workspaceId}`,
        `Current module: ${progress.currentModuleId}`,
        `Pending next module: ${progress.nextModuleId || "none"}`,
        `Pending feedback module: ${progress.pendingFeedbackModuleId || "none"}`,
        `Active exercise: ${progress.exerciseSession ? `${progress.exerciseSession.moduleId} step ${progress.exerciseSession.stepIndex + 1}` : "none"}`,
        `Completed modules: ${progress.completedModuleIds.length}`,
        `Completed interactive exercises: ${progress.completedExerciseModuleIds.length}`,
        `Skipped modules: ${progress.skippedModuleIds.length}`,
        `Has completed onboarding before: ${progress.hasCompletedOnboardingBefore ? "yes" : "no"}`
      ]
    };
  }

  if (command === "restart") {
    const progress = restartProgress(cwd, manifest);
    return {
      ok: true,
      lines: [
        "Onboarding progress has been reset locally.",
        `Starting again at module: ${progress.currentModuleId}`
      ]
    };
  }

  if (command === "rate") {
    const rating = parseRating(args[0]);
    if (rating === null) {
      return {
        ok: false,
        lines: ["Please provide a rating from 1 to 5."]
      };
    }
    const progress = readProgress(cwd, manifest);
    const targetModuleId = progress.pendingFeedbackModuleId || progress.currentModuleId;
    appendRating(cwd, {
      moduleId: targetModuleId,
      rating
    });
    return {
      ok: true,
      lines: [
        `Saved rating ${rating} for ${targetModuleId}.`,
        "If you'd like, add more context with: feedback <message>",
        "",
        renderReturnHint(cwd, manifest)
      ]
    };
  }

  if (command === "feedback") {
    const message = getMessageArg(args);
    if (!message) {
      return {
        ok: true,
        lines: [
          "What would you like to share?",
          "Type your feedback on the next line, or type `cancel` to go back."
        ],
        promptFeedback: true
      };
    }
    const progress = readProgress(cwd, manifest);
    const targetModuleId = progress.pendingFeedbackModuleId || progress.currentModuleId;
    appendFeedback(cwd, {
      moduleId: targetModuleId,
      category: "general",
      message,
      channel: process.env.OPENCODE_CHANNEL || "terminal"
    });
    return {
      ok: true,
      lines: withReturnHint(context, [
        "Thanks. Your feedback was saved locally.",
        `When you're ready, you can paste an export block into: ${manifest.surveyUrl}`
      ])
    };
  }

  if (command === "show") {
    return {
      ok: true,
      lines: [renderCurrentModule(cwd, manifest)]
    };
  }

  if (command === "exercise") {
    const result = startExerciseSession(cwd, manifest);
    return {
      ok: result.available,
      lines: result.lines,
      promptExercise: result.available
    };
  }

  if (command === "complete") {
    const result = completeCurrentModule(cwd, manifest);
    const lines = [`Completed ${result.completedModule.title}.`];
    lines.push("");
    lines.push("Module complete.");
    lines.push("Please rate this module with: rate <1-5>");
    lines.push("Share extra thoughts with: feedback <message>");
    lines.push("Create a copy/paste feedback block with: export-feedback");
    lines.push(`Survey link: ${manifest.surveyUrl}`);

    if (result.nextModule) {
      lines.push("");
      lines.push("When you're ready to move on, use: next");
      lines.push(`Next module: ${result.nextModule.title}`);
    } else {
      lines.push("");
      lines.push("You've reached the end of the onboarding path. You can restart any time with: restart");
    }

    return {
      ok: true,
      lines
    };
  }

  if (command === "next") {
    const result = moveToNextModule(cwd, manifest);
    if (!result.moved) {
      return {
        ok: false,
        lines: ["There isn't a saved next step yet. Finish the current module with: complete"]
      };
    }
    return {
      ok: true,
      lines: [`Moved to ${result.nextModule.title}.`, "", renderCurrentModule(cwd, manifest)]
    };
  }

  if (command === "skip") {
    const result = skipCurrentModule(cwd, manifest);
    if (!result.allowed) {
      return {
        ok: false,
        lines: [
          "Skipping is available after you've completed the full onboarding once.",
          "For a first run, the default path keeps the modules in order so the concepts build safely."
        ]
      };
    }
    if (result.nextModule) {
      return {
        ok: true,
        lines: [`Skipped ${result.skippedModule.title}.`, "", renderCurrentModule(cwd, manifest)]
      };
    }
    return {
      ok: true,
      lines: ["There are no more modules to skip to."]
    };
  }

  if (command === "prev") {
    const result = moveToPreviousModule(cwd, manifest);
    if (!result.moved) {
      return {
        ok: true,
        lines: ["You're already at the first module."]
      };
    }
    return {
      ok: true,
      lines: [`Moved back to ${result.previousModule.title}.`, "", renderCurrentModule(cwd, manifest)]
    };
  }

  if (command === "export-feedback") {
    const exportPath = exportFeedback(cwd, manifest);
    return {
      ok: true,
      lines: withReturnHint(context, [`Feedback export created at ${exportPath}`])
    };
  }

  if (command === "export-diagnostics") {
    const exportPath = exportDiagnostics(cwd, manifest);
    return {
      ok: true,
      lines: withReturnHint(context, [`Diagnostics export created at ${exportPath}`])
    };
  }

  if (command === "help") {
    return {
      ok: true,
      lines: [renderHelpText()]
    };
  }

  if (command === "ask") {
    const question = getMessageArg(args);
    if (!question) {
      return {
        ok: false,
        lines: ["Ask a question by adding text, for example: ask What is MCP?"]
      };
    }
    return {
      ok: true,
      lines: withReturnHint(context, [
        answerQuestion(cwd, manifest, question),
        "",
        "When you're ready, we can continue with the current module."
      ])
    };
  }

  return {
    ok: false,
    lines: [
      "I didn't recognize that onboarding command.",
      "Try: interactive, start, resume, show, exercise, complete, next, prev, status, restart, rate <1-5>, feedback <message>, export-feedback, export-diagnostics, or ask <question>."
    ]
  };
}

function printResult(result) {
  for (const line of result.lines) {
    print(line);
  }
}

function parseInputLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("/")) {
    const withoutSlash = trimmed.slice(1);
    if (withoutSlash === "feedback") {
      return { command: "feedback", args: [] };
    }
    if (withoutSlash === "onboarding") {
      return { command: "show", args: [] };
    }
  }

  const [command, ...args] = trimmed.split(/\s+/);
  const knownCommands = new Set([
    "help",
    "show",
    "status",
    "exercise",
    "complete",
    "next",
    "prev",
    "skip",
    "rate",
    "feedback",
    "export-feedback",
    "export-diagnostics",
    "ask",
    "restart",
    "resume",
    "start",
    "interactive"
  ]);

  if (knownCommands.has(command)) {
    return { command, args };
  }

  return { command: "ask", args: [trimmed] };
}

async function runInteractiveSession(context) {
  const intro = executeCommand(context, "interactive");
  printResult(intro);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "onboarding> "
  });

  let pendingMode = null;

  rl.prompt();

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) {
      rl.prompt();
      continue;
    }

    if (trimmed === "quit" || trimmed === "exit") {
      print("Thanks for spending time with the onboarding flow. You can resume any time.");
      rl.close();
      break;
    }

    if (pendingMode === "feedback") {
      pendingMode = null;
      if (trimmed.toLowerCase() === "cancel") {
        print("");
        print("No problem. Feedback was not saved.");
        print("");
        print(renderReturnHint(context.cwd, context.manifest));
        print("");
        rl.prompt();
        continue;
      }

      const result = executeCommand(context, "feedback", [trimmed]);
      print("");
      printResult(result);
      print("");
      rl.prompt();
      continue;
    }

    if (pendingMode === "exercise") {
      if (trimmed.toLowerCase() === "cancel") {
        pendingMode = null;
        const cancelled = cancelExerciseSession(context.cwd, context.manifest);
        print("");
        printResult({ lines: cancelled.lines });
        print("");
        rl.prompt();
        continue;
      }

      if (trimmed === "help" || trimmed === "status" || trimmed === "show") {
        const parsed = parseInputLine(trimmed);
        const result = executeCommand(context, parsed.command, parsed.args);
        print("");
        printResult(result);
        print("");
        const exerciseResult = startExerciseSession(context.cwd, context.manifest);
        printResult({ lines: ["Returning to the exercise.", "", ...exerciseResult.lines] });
        print("");
        pendingMode = "exercise";
        rl.prompt();
        continue;
      }

      if (trimmed.startsWith("ask ")) {
        const question = trimmed.slice(4);
        const result = executeCommand(context, "ask", [question]);
        print("");
        printResult(result);
        print("");
        const exerciseResult = startExerciseSession(context.cwd, context.manifest);
        printResult({ lines: ["Returning to the exercise.", "", ...exerciseResult.lines] });
        print("");
        pendingMode = "exercise";
        rl.prompt();
        continue;
      }

      const exerciseResult = handleExerciseResponse(context.cwd, context.manifest, trimmed);
      print("");
      printResult({ lines: exerciseResult.lines });
      print("");
      pendingMode = exerciseResult.active ? "exercise" : null;
      rl.prompt();
      continue;
    }

    const parsed = parseInputLine(trimmed);
    if (!parsed) {
      rl.prompt();
      continue;
    }

    const result = executeCommand(context, parsed.command, parsed.args);
    print("");
    printResult(result);
    print("");
    if (result.promptFeedback) {
      pendingMode = "feedback";
    }
    if (result.promptExercise) {
      pendingMode = "exercise";
    }
    rl.prompt();
  }
}

async function main() {
  const context = createContext();
  const [, , command = "interactive", ...args] = process.argv;

  if (command === "interactive") {
    await runInteractiveSession(context);
    return;
  }

  const result = executeCommand(context, command, args);
  printResult(result);
  if (!result.ok) {
    process.exitCode = 1;
  }
}

main();
