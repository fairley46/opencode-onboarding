# OpenCode Onboarding

AI-facilitated onboarding for enterprise teams adopting OpenCode.

Most AI onboarding fails because it lives outside the tool. You read a course, forget it, and then face the actual product alone on day one. This program runs entirely inside OpenCode. The AI is the facilitator. You open a folder, the AI greets you, and you work through 15 short modules together at your own pace, learning by using the thing you're learning about.

---

## What a Session Looks Like

```
AI:   Welcome back. You completed Module 2 last session. You're on Module 3:
      "When to Trust AI Output."

      Ready to pick up where you left off, or do you want a quick recap of
      Module 2 first?

You:  Quick recap, then let's go.

AI:   Module 2 covered how OpenCode works under the hood. The model reads
      your context files, reasons over them, and responds. It does not have
      memory between sessions unless you provide it.

      Module 3 is about calibration: how to know when to trust, verify, or
      push back on what the AI tells you. It's one of the most practically
      useful habits in this whole program.

      The core framework is two questions...
```

The learner never runs a command. They just talk to the AI. Progress is saved automatically after each module.

---

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                      OpenCode                           │
│                                                         │
│   AGENTS.md ──────► AI reads facilitator instructions  │
│   org/ ────────────► AI reads your org's policy        │
│   PROGRESS.md ─────► AI knows where you left off       │
│                  │                                      │
│                  ▼                                      │
│         Conversational session                         │
│         Module presentation                            │
│         Exercise + feedback                            │
│                  │                                      │
│                  ▼                                      │
│         PROGRESS.md updated, next session picks up     │
└─────────────────────────────────────────────────────────┘
```

OpenCode already reads context files at session start. This repo uses that to turn OpenCode into a facilitator. No separate app, no web server, no build step.

**The five files that make it work:**

| File | Role |
|------|------|
| `AGENTS.md` | Tells the AI its role, the curriculum, the tone, and escalation rules |
| `modules/` | 15 plain markdown lesson files |
| `org/` | Your org's policy, approved tools, and escalation contacts |
| `PROGRESS.md` | Per-learner state, created by setup and updated after each module |
| `manifest.json` | Ordered module list. Add a line here to add a module. |

---

## Learner Journey

```
git clone -> npm run setup -> open in OpenCode
                                    |
                    +---------------v---------------+
                    |   AI greets you               |
                    |   Checks PROGRESS.md          |
                    |   Starts or resumes           |
                    +---------------+---------------+
                                    |
                    +---------------v---------------+
                    |   Module presentation         |<--+
                    |   Questions welcome           |   |
                    |   Short exercise              |   |
                    |   PROGRESS.md updated         |   |
                    +---------------+---------------+   |
                                    |                   |
                              More modules? ------------+
                                    | No
                    +---------------v---------------+
                    |   Program complete            |
                    |   ~2 hours across sessions    |
                    +-------------------------------+
```

---

## Getting Started

### For Learners

**Requirements:** OpenCode (desktop or terminal) and Node.js 20+

```bash
git clone https://github.com/fairley46/opencode-onboarding.git
cd opencode-onboarding
npm run setup
```

Then open the `opencode-onboarding` folder in OpenCode. That's it.

`npm run setup` creates your personal `PROGRESS.md` and copies the org config templates. It runs once. Everything after that happens in the conversation.

There is no `npm run onboarding` command. The onboarding experience is conversational — the AI facilitates it. Running a terminal command is not how you advance through the program. If you see an `npm` error about a missing script, that is expected.

---

### For Admins: Rolling Out to Your Team

**Step 1: Fill in org config**

Before giving this to learners, edit three files in `org/`:

| File | What it controls |
|------|-----------------|
| `org/org-context.md` | Approved uses, disallowed uses, governance notes |
| `org/escalation.md` | Who learners contact for policy, AI, and security questions |
| `org/approved-mcps.json` | Which MCP servers learners are allowed to connect |

The `org/*.template.*` files show the expected format. The AI reads these at the start of every session.

**Step 2: Share the repo**

Fork or copy this repo, fill in the org config, then share it with learners. Each learner runs `npm run setup` themselves. Their `PROGRESS.md` is local and gitignored, so progress won't conflict across users.

**Step 3: Optionally add your own modules**

One markdown file plus one line in `manifest.json`. No code changes needed. See [CUSTOMIZATION.md](CUSTOMIZATION.md).

---

## Curriculum

15 modules, about 2 hours total, each with a short exercise.

| # | Module | Focus |
|---|--------|-------|
| 1 | Welcome and Safety | What this program is; job security framing; human accountability |
| 2 | What AI Is Doing Here | Plain-language model of how OpenCode works |
| 3 | When to Trust AI Output | Trust calibration; hallucination patterns; verification habits |
| 4 | Agent vs Assistant | The difference; why it matters for trust |
| 5 | OpenCode Modes: Plan, Edit, and Agent | What each mode allows; how to choose; control awareness |
| 6 | Local vs Web Execution | What runs where; what leaves the machine |
| 7 | Data Safety and Shadow AI | What never goes in a prompt; why the approved tool matters |
| 8 | Guard Rails and Permissions | Least privilege; review habits |
| 9 | What MCP Is and Why It Matters | Connectors; how to add one; what to check |
| 10 | Using Markdown to Shape Behavior | Guidance files; AGENTS.md; real template |
| 11 | Asking Questions Across Tools | Multi-source prompting; conflicting sources; source attribution |
| 12 | Build a Tiny Helper Tool | Hands-on: read-only policy search in ~70 lines |
| 13 | Tokens and Practical Limits | ~300 tokens/page; practical sizing heuristics |
| 14 | First Useful Workflows | Four-part prompt framework; three copy-and-adapt templates |
| 15 | Troubleshooting and Next Steps | When things go wrong; where to go next |

---

## Project Structure

```
AGENTS.md               Facilitator instructions, OpenCode reads this first
CUSTOMIZATION.md        How to add modules, customize org config, roll out
PROGRESS.md             Learner progress (created by setup, gitignored)
manifest.json           Ordered module list with time estimates
setup.js                One-time scaffolding that copies templates and creates PROGRESS.md
modules/                15 lesson files
exercises/              Exercise prompts and helper-tool template
org/                    Org config files (fill in before rollout) and *.template.* reference files
docs/                   Backlog and implementation notes
archive/cli/            Prior Node.js CLI architecture, preserved for reference
```

---

## Security

- No telemetry, no install hooks, no external network calls
- Learner state is local only. PROGRESS.md never leaves the machine.
- Read-only-first patterns throughout the curriculum and exercises

See [SECURITY.md](SECURITY.md) and [THREAT_MODEL.md](THREAT_MODEL.md) for details.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
