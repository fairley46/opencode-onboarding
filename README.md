<h1 align="center">Juno</h1>

<p align="center">
  <img src="assets/juno-logo.png" alt="Juno" width="320" />
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://github.com/fairley46/opencode-onboarding/releases"><img src="https://img.shields.io/badge/version-0.5.0-blue.svg" alt="Version"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg" alt="Node"></a>
</p>

**An AI tutor named Juno that teaches your team to use OpenCode — running inside OpenCode itself.**

---

## Quick Start

```bash
git clone https://github.com/fairley46/opencode-onboarding.git
cd opencode-onboarding
npm run setup
```

Then open the `opencode-onboarding` folder in OpenCode. The tutor takes it from there.

**Requirements:** [OpenCode](https://opencode.ai) (desktop or terminal) · Node.js 20+

---

## The Problem

Most enterprise AI onboarding fails for the same reason: it lives outside the tool. Someone reads a course, watches a video, or sits through a workshop. Then on day one they open the actual product and face it alone.

This program runs entirely inside OpenCode. The AI is the tutor. You learn how to use OpenCode by using it — with a tutor running inside the very thing you are learning.

---

## What a Session Looks Like

```
AI:   Welcome back. You're on Module 3: "When to Trust AI Output."

      Last time we covered how OpenCode works — today builds on that,
      because knowing what the model is doing is what makes trust
      calibration possible.

      Before we get into it: when you imagine AI being wrong, what does
      that look like? A confident wrong answer, or something obviously broken?

You:  Confident wrong answer. That's the scary part.

AI:   That's exactly right to worry about. Most people picture something
      obviously broken. The harder problem is when it sounds exactly right
      and isn't. Module 3 is built around that...

      [module content, section by section]

      That's Module 3. On a scale of 1 to 5 — how clear was that?

You:  4. Pretty solid.

AI:   Good. I have two links if you want to go deeper. I can also search
      what's happening in the industry around AI trust right now — recent
      examples, how teams are handling it. Want me to look?

You:  Yeah, hit me.

AI:   [searches, returns current context clearly labeled as separate from
      the course, then returns to the program]

      Ready to move on to Module 4?
```

---

## What Makes This Different

Most AI training tools present content. This one teaches.

| What the tutor does | Why it matters |
|---------------------|----------------|
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

Every learner at your org gets the same 15 modules in the same order. That consistency is intentional — it builds shared vocabulary, shared habits, and a common baseline for running AI safely at scale.

---

## How It Works

```
git clone → npm run setup → open folder in OpenCode
                                        |
                          +-------------v--------------+
                          |  AI reads AGENTS.md        |
                          |  AI reads org/ config      |
                          |  AI reads PROGRESS.md      |
                          +-------------+--------------+
                                        |
                          +-------------v--------------+
                          |  Greets learner            |
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

OpenCode reads context files at session start. This repo uses that behavior to turn OpenCode into a tutor. No separate app, no web server, no build step.

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

See `org/*.template.*` files for the expected format. The tutor reads these at the start of every session.

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
| 2 | What AI Is Doing Here | Plain-language model of how OpenCode works |
| 3 | When to Trust AI Output | Trust calibration; hallucination patterns; verification habits |
| 4 | Agent vs Assistant | The difference; why it matters for how you review output |
| 5 | OpenCode Modes: Plan, Edit, and Agent | What each mode allows; how to choose; control awareness |
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
AGENTS.md          Tutor instructions — OpenCode reads this first
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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
