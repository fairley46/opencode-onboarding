const {
  getCurrentModule,
  getModuleById,
  readProgress,
  renderReturnHint,
  saveProgress
} = require("./onboarding");

function includesAny(text, words) {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word));
}

function normalize(input) {
  return input.trim();
}

const EXERCISES = {
  "01-welcome": {
    title: "A calm start",
    intro:
      "This exercise is here to get you oriented, not to test you. Short answers are completely fine.",
    steps: [
      {
        prompt:
          "In one sentence, what would make this onboarding feel successful or useful for you?",
        evaluate(input) {
          const value = normalize(input);
          if (!value) {
            return {
              accepted: false,
              response: "A short sentence is enough. You can keep it simple."
            };
          }
          return {
            accepted: true,
            response:
              "That is a good starting point. We want the rest of the onboarding to feel practical and relevant to that goal."
          };
        }
      },
      {
        prompt:
          "Please check that you are in the intended OpenCode workspace or enterprise account. When you've checked, type `done`. If something feels unclear, describe it.",
        evaluate(input) {
          const value = normalize(input);
          if (includesAny(value, ["done", "checked", "confirmed"])) {
            return {
              accepted: true,
              response:
                "Good. Starting in the right environment matters because the training should match the place where you'll actually work."
            };
          }
          if (value) {
            return {
              accepted: true,
              response:
                "Thanks for calling that out. If the environment ever feels unclear, that is worth resolving early rather than guessing."
            };
          }
          return {
            accepted: false,
            response: "Type `done` once you've checked, or tell me what feels unclear."
          };
        }
      },
      {
        prompt:
          "Who stays responsible for decisions and approvals in this workflow: you, the AI, or both? Answer in your own words.",
        evaluate(input) {
          const value = normalize(input);
          if (includesAny(value, ["ai only", "just the ai", "the ai"])) {
            return {
              accepted: false,
              response:
                "Close, but this is the key boundary: the AI helps, while humans remain responsible for decisions and approvals."
            };
          }
          if (includesAny(value, ["you", "human", "both", "people"])) {
            return {
              accepted: true,
              response:
                "Exactly. AI can accelerate the work, but people still own judgment, approval, and accountability."
            };
          }
          return {
            accepted: true,
            response:
              "The key takeaway is that human responsibility does not go away just because AI is helping."
          };
        }
      }
    ]
  },
  "02-what-ai-is-doing": {
    title: "How the model actually helps",
    intro:
      "This exercise is about learning the mental model: better instructions and better context usually create better results.",
    steps: [
      {
        prompt:
          "Which prompt is likely to work better?\nA) Help with this\nB) Summarize this policy in 5 bullets and list what I should verify with a person",
        evaluate(input) {
          const value = normalize(input).toLowerCase();
          if (value === "b" || value.includes("summarize this policy")) {
            return {
              accepted: true,
              response:
                "Right. Prompt B gives a clear goal, output format, and review boundary."
            };
          }
          if (value === "a" || value.includes("help with this")) {
            return {
              accepted: false,
              response:
                "A is too vague. The system has much less to work with, so the result is more likely to be generic."
            };
          }
          return {
            accepted: false,
            response: "Try answering with `A` or `B`."
          };
        }
      },
      {
        prompt:
          "Name one kind of context the AI may need in order to help well here.",
        evaluate(input) {
          const value = normalize(input);
          if (!value) {
            return {
              accepted: false,
              response: "One short example is enough: a file, a goal, a source, or a boundary."
            };
          }
          return {
            accepted: true,
            response:
              "Yes. Useful context might be the goal, a source document, the audience, or the format you want back."
          };
        }
      },
      {
        prompt:
          "Write one short safe prompt you could imagine using at work that includes a goal and an output you want back.",
        evaluate(input) {
          const value = normalize(input);
          if (value.split(/\s+/).length < 6) {
            return {
              accepted: false,
              response:
                "Make it a little more specific. Include what you want done and what kind of answer you want back."
            };
          }
          return {
            accepted: true,
            response:
              "Nice. That already has the shape of a usable workplace prompt: a task, some context, and an expected result."
          };
        }
      }
    ]
  },
  "03-agent-vs-assistant": {
    title: "Spot the difference",
    intro:
      "This exercise helps you notice when you only need an answer and when you are asking for a more tool-driven workflow.",
    steps: [
      {
        prompt:
          "If you only want a plain-language explanation of a document, is that closer to an assistant workflow or an agent workflow?",
        evaluate(input) {
          const value = normalize(input).toLowerCase();
          if (value.includes("assistant")) {
            return {
              accepted: true,
              response:
                "Exactly. That request is mainly about explanation, so assistant is the closer mental model."
            };
          }
          if (value.includes("agent")) {
            return {
              accepted: false,
              response:
                "Not quite. If the task is just explanation, assistant is the better fit."
            };
          }
          return {
            accepted: false,
            response: "Try answering with `assistant` or `agent`."
          };
        }
      },
      {
        prompt:
          "If you want OpenCode to inspect files, compare them, and suggest a draft next step, is that more like assistant, agent, or both?",
        evaluate(input) {
          const value = normalize(input).toLowerCase();
          if (value.includes("agent") || value.includes("both")) {
            return {
              accepted: true,
              response:
                "Yes. That is the more active, tool-using pattern we usually describe as agent behavior."
            };
          }
          return {
            accepted: false,
            response:
              "Look for the clue in the tool use. Inspecting files and comparing them points toward agent-style behavior."
          };
        }
      },
      {
        prompt:
          "Once tools are involved, what matters more: permissions, review, boundaries, or something similar? Answer in your own words.",
        evaluate(input) {
          const value = normalize(input);
          if (!value) {
            return {
              accepted: false,
              response: "A short answer is fine. You can mention permissions, review, boundaries, or approval."
            };
          }
          if (includesAny(value, ["permission", "review", "boundary", "approval", "guard"])) {
            return {
              accepted: true,
              response:
                "Exactly. More capability means stronger need for permissions, boundaries, and human review."
            };
          }
          return {
            accepted: true,
            response:
              "The core idea is that tool use raises the governance bar. Boundaries and review matter more when the system can do more."
          };
        }
      }
    ]
  }
};

function getExerciseForModule(moduleId) {
  return EXERCISES[moduleId] || null;
}

function getExercisePrompt(exercise, stepIndex) {
  const step = exercise.steps[stepIndex];
  return [
    `Exercise: ${exercise.title}`,
    `Step ${stepIndex + 1} of ${exercise.steps.length}`,
    "",
    step.prompt,
    "",
    "You can answer in your own words. Type `cancel` to leave the exercise for now."
  ].join("\n");
}

function startExerciseSession(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  const module = getCurrentModule(manifest, progress);
  const exercise = getExerciseForModule(module.id);

  if (!exercise) {
    return {
      available: false,
      lines: [
        `There isn't an interactive exercise for ${module.title} yet.`,
        "For now, you can keep using the lesson content and the guided questions."
      ]
    };
  }

  if (!progress.exerciseSession || progress.exerciseSession.moduleId !== module.id) {
    progress.exerciseSession = {
      moduleId: module.id,
      stepIndex: 0
    };
    progress.lastStepId = "exercise";
    saveProgress(cwd, progress);
  }

  return {
    available: true,
    lines: [
      exercise.intro,
      "",
      getExercisePrompt(exercise, progress.exerciseSession.stepIndex)
    ]
  };
}

function handleExerciseResponse(cwd, manifest, input) {
  const progress = readProgress(cwd, manifest);
  const session = progress.exerciseSession;

  if (!session) {
    return {
      active: false,
      lines: [
        "There is no active exercise right now.",
        "Use `exercise` to start the current module exercise."
      ]
    };
  }

  const module = getModuleById(manifest, session.moduleId);
  const exercise = getExerciseForModule(session.moduleId);
  const step = exercise.steps[session.stepIndex];
  const outcome = step.evaluate(input);

  if (!outcome.accepted) {
    return {
      active: true,
      lines: [
        outcome.response,
        "",
        getExercisePrompt(exercise, session.stepIndex)
      ]
    };
  }

  const lines = [outcome.response];
  const nextStepIndex = session.stepIndex + 1;

  if (nextStepIndex < exercise.steps.length) {
    progress.exerciseSession.stepIndex = nextStepIndex;
    saveProgress(cwd, progress);
    lines.push("");
    lines.push(getExercisePrompt(exercise, nextStepIndex));
    return {
      active: true,
      lines
    };
  }

  progress.exerciseSession = null;
  if (!progress.completedExerciseModuleIds.includes(module.id)) {
    progress.completedExerciseModuleIds.push(module.id);
  }
  progress.lastStepId = "exercise-complete";
  saveProgress(cwd, progress);

  lines.push("");
  lines.push(`Nice work. You completed the interactive exercise for ${module.title}.`);
  lines.push("When you're ready, finish the module with: complete");
  lines.push("");
  lines.push(renderReturnHint(cwd, manifest));

  return {
    active: false,
    lines
  };
}

function cancelExerciseSession(cwd, manifest) {
  const progress = readProgress(cwd, manifest);
  progress.exerciseSession = null;
  progress.lastStepId = "exercise-cancelled";
  saveProgress(cwd, progress);
  return {
    lines: [
      "No problem. The exercise is paused.",
      "",
      renderReturnHint(cwd, manifest)
    ]
  };
}

module.exports = {
  cancelExerciseSession,
  getExerciseForModule,
  handleExerciseResponse,
  startExerciseSession
};
