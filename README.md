# OpenCode Onboarding

Most enterprise AI onboarding fails for the same reason: it lives outside the tool. Someone reads a course, watches a video, or sits through a workshop. Then on day one they open the actual product and face it alone. The course didn't teach them the tool — it taught them about the tool, in a different context, with different stakes.

This program runs entirely inside OpenCode. The AI is the tutor. You open a workspace folder, the AI greets you, and you work through 15 short modules together — learning how to use OpenCode by using it, with a tutor running inside the very thing you are learning.

---

## What Makes This Different

This is not a chatbot that reads slides at you. The tutor is designed to teach, not just present.

Before introducing each concept, it asks what you already think. It names the wrong mental model before the right one — "Most people assume X; that's not quite right, and here's why" — because clearing the old picture is half the work. It finds analogies in your own work context instead of landing on generic examples. When it needs to check whether something landed, it asks you to explain it back or apply it to a real situation in your own work. It does not ask "does that make sense?"

If your answers are short or uncertain, it slows down and tries a different approach — not the same explanation again, but a different one. It reads your engagement.

Each module connects backward to the one before it. Each exercise has specific completion criteria; the tutor does not advance until those are met.

After each module, two things are available if you want them — neither is required, and neither is part of the core training:

**Further reading.** Curated links for each module, with a one-line description of what they are and why they matter. You control these as an admin; learners get them as an optional offer after completing the module.

**Live research.** The tutor can look up what is happening in the industry around a topic right now — recent developments, real examples, how other organizations are approaching it. This is clearly framed as exploration, not instruction. It does not affect module progression or the golden path. It exists because the world moves fast and a static course cannot keep up.

Across your org, every learner gets the same 15 modules in the same order. That consistency is intentional. The training stays stable and authoritative. The current-awareness layer sits on top, clearly separate, so your team builds shared habits from a common baseline while staying connected to what is actually happening out there.

---

## What a Session Looks Like

```
AI:   Welcome back. You completed Module 2 last session. You're on Module 3:
      "When to Trust AI Output."

      Last time we covered how OpenCode works under the hood — today builds
      directly on that, because knowing what the model is doing is what makes
      trust calibration possible.

      Before we get into it: when you imagine AI being wrong, what does that
      look like in your head? A confident wrong answer, or something more
      obviously broken?

You:  Confident wrong answer. That's the scary part.

AI:   That's exactly the right thing to be worried about. Most people picture
      something obviously broken — the AI says "2 + 2 = fish" and you catch it
      immediately. The harder problem is when it sounds exactly right and isn't.

      [module content, section by section, with checks along the way...]

      That's Module 3. On a scale of 1 to 5 — how clear was that?

You:  4. Pretty solid.

AI:   Good. I have two links if you want to go deeper — one is Anthropic's
      model card with the known failure modes we just discussed, and one is
      a real-world hallucination taxonomy from their research team. Want them?

You:  Sure.

AI:   [shares links with one-line context for each]

      I can also look up what's happening in the industry around AI trust and
      verification right now — recent examples, how teams are handling this in
      practice. That's separate from the course itself, just current context
      if you're curious.

You:  Yeah, hit me.

AI:   [searches, presents findings clearly labeled as current context, not
      course material, then returns to the program]

      Ready to move on to Module 4?
```

The learner never runs a command to advance the program. Everything is conversational. Progress is saved after each module.

---

## How It Works

```
+-----------------------------------------------------------+
|                        OpenCode                           |
|                                                           |
|   AGENTS.md ---------> AI reads tutor instructions        |
|   org/ --------------> AI reads your org's policy         |
|   manifest.json -----> AI knows module order + links      |
|   PROGRESS.md -------> AI knows where you left off        |
|                  |                                        |
|                  v                                        |
|         Conversational session                            |
|         Module presentation                               |
|         Exercise + feedback                               |
|                  |                                        |
|                  v                                        |
|         PROGRESS.md updated, next session picks up        |
+-----------------------------------------------------------+
```

OpenCode reads context files at session start. This repo uses that behavior to turn OpenCode into a tutor. No separate app, no web server, no build step.

**The files that make it work:**

| File | Role |
|------|------|
| `AGENTS.md` | Tells the AI its role as tutor — the teaching protocol, curriculum, org escalation rules, and how to handle live research |
| `modules/` | 15 plain markdown lesson files |
| `org/` | Your org's policy, approved tools, and escalation contacts |
| `manifest.json` | Ordered module list with time estimates and curated further reading links per module |
| `PROGRESS.md` | Per-learner state, created by setup and updated after each module |

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
                    |   Elicits prior knowledge     |<--+
                    |   Names the wrong model first |   |
                    |   Teaches section by section  |   |
                    |   Checks understanding        |   |
                    |   Short exercise              |   |
                    |   Rating + further reading    |   |
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

There is no `npm run onboarding` command. The onboarding experience is conversational. If you see an npm error about a missing script, that is expected.

---

### For Admins

The program has three layers. Understanding them is the key to running this well across your org.

**Layer 1: The golden path (15 modules)**

The core curriculum. Stable, authoritative, and consistent across every learner at your org. All 15 modules run in order, and every employee gets the same sequence. This is what makes shared vocabulary and shared habits possible. You do not need to touch these files unless you are adding an org-specific module.

**Layer 2: Further reading (per-module curated links)**

After each module, the tutor can offer optional links for learners who want to go deeper. These live in `manifest.json` under each module's `further_reading` field. You control them. You can update, replace, or remove any link by editing `manifest.json` — no other files need to change. This layer is clearly presented to learners as optional and separate from the training.

**Layer 3: Live research (on demand)**

Learners can ask the AI to look up current context on any topic — recent developments, industry examples, updated documentation. This is not part of the structured curriculum. It is available because OpenCode is a live AI environment, not a static course. Learners use it when they want to; it does not affect module progression.

**Rolling out to your team**

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

**Step 3: Optionally add org-specific modules**

One markdown file in `modules/` plus one entry in `manifest.json`. No code changes. See [CUSTOMIZATION.md](CUSTOMIZATION.md).

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
AGENTS.md               Facilitator instructions — OpenCode reads this first
CUSTOMIZATION.md        How to add modules, customize org config, roll out
PROGRESS.md             Learner progress (created by setup, gitignored)
manifest.json           Ordered module list with time estimates and further reading links
setup.js                One-time scaffolding that copies templates and creates PROGRESS.md
modules/                15 lesson files in plain markdown
exercises/              Exercise prompts and helper-tool template
org/                    Org config files (fill in before rollout) and *.template.* reference files
docs/                   Backlog and implementation notes
archive/cli/            Prior Node.js CLI architecture, preserved for reference
```

---

## Security

- No telemetry, no install hooks, no external network calls
- Learner state is local only — PROGRESS.md never leaves the machine
- Read-only-first patterns throughout the curriculum and exercises

See [SECURITY.md](SECURITY.md) and [THREAT_MODEL.md](THREAT_MODEL.md) for details.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
