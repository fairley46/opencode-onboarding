<h1 align="center">Juno</h1>

<p align="center">
  <img src="assets/juno-logo.png" alt="Juno" width="320" />
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://github.com/fairley46/juno/releases"><img src="https://img.shields.io/badge/version-1.2.0-blue.svg" alt="Version"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg" alt="Node"></a>
</p>

**The AI tutor that lives inside your agent.**

---

## Prerequisites

- **Git** — [git-scm.com/downloads](https://git-scm.com/downloads)
- **Node.js 20+** — [nodejs.org](https://nodejs.org) (download the LTS version)
- **An AI agent** — install one before you start:

| Agent | Install |
|-------|---------|
| OpenCode | [opencode.ai](https://opencode.ai) |
| Claude Code CLI | [docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview) |
| Gemini CLI | [github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) |
| OpenAI Codex CLI | [github.com/openai/codex](https://github.com/openai/codex) |
| Cursor | [cursor.com](https://cursor.com) |
| Claude.ai Projects | [claude.ai](https://claude.ai) — no install needed, runs in the browser |

> **Not sure which to pick?** Claude.ai Projects requires no install and works in any browser — it's the lowest-friction starting point for non-technical users. OpenCode and Claude Code CLI are the best experience for technical teams.

> **Model recommendation:** Use the most capable model your tool supports. Juno's behavioral protocol works best on frontier models. On older or smaller models you may see inconsistent behavior — Juno may skip steps or lose track of progress state.

---

## Quick Start

**Step 1 — Clone and set up (same for all platforms)**

```bash
git clone https://github.com/fairley46/juno.git
cd juno
npm run setup
```

**Step 2 — Open your session**

| Platform | How to start |
|----------|-------------|
| **OpenCode** | Open the `juno` folder in OpenCode. Juno starts automatically. |
| **Claude Code CLI** | `cp AGENTS.md CLAUDE.md` then run `claude` in the folder |
| **Gemini CLI** | `cp AGENTS.md GEMINI.md` then run `gemini` in the folder |
| **OpenAI Codex CLI** | Run `codex` in the folder — reads `AGENTS.md` natively |
| **Cursor / VS Code** | Open the folder, add `AGENTS.md` as context or copy to `.cursorrules` |
| **Claude.ai Projects** | Paste `AGENTS.md` into project instructions, upload `modules/` and `exercises/` as files. Track progress manually — `PROGRESS.md` won't auto-update. |

Juno introduces herself, evaluates your learning style, and takes it from there.

---

## The Problem

Most enterprise AI onboarding fails for the same reason: it lives outside the tool. Someone reads a course, watches a video, or sits through a workshop. Then on day one they open the actual product and face it alone.

Juno runs inside the AI agent your team is already using. You learn how to work with AI by working with AI — with a tutor running in the very environment you are learning.

---

## What a Session Looks Like

```
Juno: Welcome back. You're on Module 3: "When to Trust AI Output."

      Last time we covered how AI works — today builds on that,
      because knowing what the model is doing is what makes trust
      calibration possible.

      Before we get into it: when you imagine AI being wrong, what does
      that look like? A confident wrong answer, or something obviously broken?

You:  Confident wrong answer. That's the scary part.

Juno: That's exactly right to worry about. Most people picture something
      obviously broken. The harder problem is when it sounds exactly right
      and isn't. Module 3 is built around that...

      [module content, section by section]

      That's Module 3. On a scale of 1 to 5 — how clear was that?

You:  4. Pretty solid.

Juno: Good. I have two links if you want to go deeper. I can also search
      what's happening in the industry around AI trust right now — recent
      examples, how teams are handling it. Want me to look?

You:  Yeah, hit me.

Juno: [searches, returns current context clearly labeled as separate from
      the course, then returns to the program]

      Ready to move on to Module 4?
```

---

## What Makes This Different

Most AI training tools present content. This one teaches.

| What the tutor does | Why it matters |
|---------------------|----------------|
| Assesses AI familiarity upfront and builds a personalized path | Technical users fast-track modules they've already mastered — no wasted time, no condescending basics |
| Evaluates your learning style before the first module | Activist, Reflector, Theorist, or Pragmatist — Juno adapts how she teaches from session one |
| Asks what you already think before each concept | Teaches to your actual starting point, not a blank slate |
| Names the wrong mental model before the right one | Clearing the old picture is half the work |
| Finds analogies in your own work context | Concepts stick when they attach to something familiar |
| Checks understanding with explain-it-back, not "does that make sense?" | Surfaces real gaps instead of performed agreement |
| Reads engagement — slows down and tries a different approach | No one gets left behind with the same explanation repeated |
| Connects each module to the one before it | Builds a mental map, not isolated lessons |
| Runs an exercise after every module | 15 modules, 15 exercises — reinforcement, not just exposure |
| Offers curated further reading after each module | Go deeper on what matters to you, skip the rest |
| Searches current industry context on demand | Stable training + live awareness, clearly separated |

Every learner at your org covers the same core content. Non-technical learners get the full 15-module path. Technical learners get a personalized path — Juno assesses their existing knowledge upfront and fast-tracks or skips modules where they can demonstrate mastery, so they spend their time on what's actually new to them.

---

## How It Works

```
git clone → npm run setup → open in your AI agent
                                        |
                          +-------------v--------------+
                          |  Agent reads AGENTS.md     |
                          |  Agent reads org/ config   |
                          |  Agent reads PROGRESS.md   |
                          +-------------+--------------+
                                        |
                          +-------------v--------------+
                          |  Greets learner            |
                          |  Assesses AI familiarity   |
                          |  Builds personalized path  |
                          |  Evaluates learning style  |
                          |  Explains how it teaches   |  <--+
                          |  Elicits prior knowledge   |     |
                          |  Teaches section by section|     |
                          |  Checks understanding      |     |
                          |  Exercise + feedback       |     |
                          |  Rating + further reading  |     |
                          |  Live research (optional)  |     |
                          |  PROGRESS.md updated       |     |
                          +-------------+--------------+     |
                                        |                    |
                                  More modules? ------------+
                                        | No
                          +-------------v--------------+
                          |  Program complete          |
                          |  ~2 hours across sessions  |
                          +----------------------------+
```

Most AI coding agents read context files at session start. This repo uses that behavior to turn your agent into a tutor. No separate app, no web server, no build step.

---

## For Admins

### Three layers — understand these before rolling out

**Layer 1 — The golden path**
15 modules, stable, authoritative, consistent across every learner. All employees get the same sequence. This is what makes shared vocabulary and habits possible. Do not modify these files unless adding an org-specific module.

**Layer 2 — Further reading**
Curated links per module in `manifest.json` under `further_reading`. You control them. Offered to learners after each module rating as an optional offer — clearly separate from the training.

**Layer 3 — Live research**
After each module, the tutor searches for current industry developments on demand. Explicitly framed as exploration, not instruction. Does not affect module progression. Keeps the stable curriculum connected to a moving world.

### Rollout steps

**Step 1 — Fill in org config**

| File | What it controls |
|------|-----------------|
| `org/org-context.md` | Approved uses, disallowed uses, governance notes |
| `org/escalation.md` | Who learners contact for policy and security questions |
| `org/approved-mcps.json` | Which MCP servers learners are allowed to connect |
| `org/golden-paths.md` | Approved prompt templates Juno surfaces in Module 14 and throughout sessions |

See `org/*.template.*` files for the expected format. The tutor reads these at the start of every session. `golden-paths.md` ships with five pre-built templates — add your own org-specific patterns in the same file. See [CUSTOMIZATION.md](CUSTOMIZATION.md) for instructions.

**Step 2 — Share the repo**

Fork or copy this repo, fill in org config, share with learners. Each learner runs `npm run setup` themselves. Their `PROGRESS.md` is local and gitignored — progress won't conflict across users.

**Step 3 — Optionally add org-specific modules**

One markdown file in `modules/` plus one entry in `manifest.json`. No code changes needed. See [CUSTOMIZATION.md](CUSTOMIZATION.md).

---

## Curriculum

15 modules · 15 exercises · ~2 hours total

| # | Module | Focus |
|---|--------|-------|
| 1 | Welcome and Safety | What gets better with AI; how the tutor works; psychological safety |
| 2 | What AI Is Doing Here | Plain-language model of how AI works — key terms, context windows, models |
| 3 | When to Trust AI Output | Trust calibration; hallucination patterns; verification habits |
| 4 | Agent vs Assistant | The difference; why it matters for how you review output |
| 5 | AI Tool Modes: Plan, Edit, and Agent | What each mode allows; how to choose; control awareness |
| 6 | Local vs Web Execution | What runs where; what leaves the machine |
| 7 | Data Safety and Shadow AI | What never goes in a prompt; enterprise tenancy; approved access paths |
| 8 | Guard Rails and Permissions | Least privilege; review habits; what approval actually looks like |
| 9 | What MCP Is and Why It Matters | Connectors; how to add one; what to check before connecting |
| 10 | Using Markdown to Shape Behavior | Guidance files; AGENTS.md; real template you can use |
| 11 | Asking Questions Across Tools | Multi-source prompting; conflicting sources; source attribution |
| 12 | Build a Tiny Helper Tool | Hands-on: read-only policy search tool in ~70 lines |
| 13 | Tokens and Practical Limits | ~300 tokens/page; practical sizing heuristics |
| 14 | First Useful Workflows | Four-part prompt framework; three copy-and-adapt templates |
| 15 | Troubleshooting and Next Steps | When things go wrong; diagnostic framework; where to go next |

---

## Project Structure

```
AGENTS.md          Tutor instructions — your AI agent reads this first
CUSTOMIZATION.md   How to add modules, customize org config, roll out
manifest.json      Module list with time estimates and further reading links
setup.js           One-time scaffolding: copies templates, creates PROGRESS.md
modules/           15 lesson files in plain markdown
exercises/         15 exercises — one per module — plus helper-tool template
org/               Org config files + *.template.* reference files
PROGRESS.md        Per-learner state (created by setup, gitignored)
docs/              Backlog and implementation notes
```

---

## Security

- No telemetry, no install hooks, no external network calls
- Learner progress is local only — `PROGRESS.md` never leaves the machine
- Read-only-first patterns throughout the curriculum and exercises

See [SECURITY.md](SECURITY.md) and [THREAT_MODEL.md](THREAT_MODEL.md) for details.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
