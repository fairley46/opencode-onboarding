# Project Context

This document exists so anyone — human or AI — can pick up this project cold and understand what it is, why it's built the way it is, and what's been decided. Read this before touching anything.

---

## What This Is

**Juno** is an AI tutor that runs inside OpenCode. When a learner opens this folder in OpenCode, the AI reads `AGENTS.md` and becomes Juno — a warm, structured tutor that guides them through a 15-module enterprise AI onboarding curriculum.

The learner never leaves OpenCode. There is no separate training site, no video, no workshop. They learn how to use AI by using it, with a tutor running inside the very tool they are learning.

---

## Key Decisions and Why

### No CLI

An earlier version of this project had a Node.js CLI (`npm run onboarding`, slash commands, a full interactive terminal experience). It was removed entirely in v0.5.0.

**Why:** The CLI was solving the wrong problem. OpenCode already reads context files at session start — that's the native entrypoint. A CLI layered on top added complexity, a test suite, and a failure mode (the AI kept trying to run CLI commands mid-session). The right architecture is: AGENTS.md tells OpenCode what to do, and OpenCode does it. No code needed.

The only JavaScript that remains: `setup.js` (one-time org config scaffolding), `export.js` (completion report generator), and `exercises/templates/helper-tool/policy-lookup.js` (example code for Module 12's exercise).

### Tutor, Not Facilitator

Early versions described the AI as a "facilitator." It was renamed to "tutor" and given a name (Juno) in v0.4.0.

**Why:** "Facilitator" implies presenting content and moving on. "Tutor" implies diagnosing understanding and closing gaps. The behavioral protocol in AGENTS.md reflects this — Juno elicits prior knowledge, names wrong mental models first, finds analogies in the learner's own work, checks understanding with explain-it-back rather than "does that make sense?", and reads engagement signals. That's tutor behavior, not facilitation.

The name Juno gives learners something to relate to. It also makes it easier to write AGENTS.md instructions that feel coherent — "Juno does X" is clearer than "the AI facilitator does X."

### Learning Style Evaluation Upfront

Juno runs a 4-question Honey & Mumford learning style assessment at the very start of the first session — before any module begins. The result (Activist, Reflector, Theorist, or Pragmatist) is saved to PROGRESS.md and shapes how Juno teaches every subsequent module.

**Why:** Different learners process information differently. An Activist wants to try something before the theory. A Theorist wants the framework first. A Pragmatist wants to know how it applies to their specific job before anything else. Teaching everyone the same way is a waste of the medium — if the tutor is adaptive, it should actually adapt. The Honey & Mumford model was chosen because it's well-validated, practically applicable, and maps cleanly to teaching behavior adjustments (not just content format).

The evaluation happens upfront — not blended into module teaching — so Juno has a clear profile before she starts.

### Three-Layer Architecture

The curriculum has three information layers:

1. **Golden path** — 15 modules, stable, consistent across every learner. Do not modify these unless adding an org-specific module. This is what creates shared vocabulary and habits across a team.

2. **Further reading** — curated links per module in `manifest.json` under `further_reading`. Offered after each module rating as an optional offer. The learner can skip it. These are stable references, not news.

3. **Live research** — after each module, Juno offers to search for current industry developments around the topic. Explicitly framed as exploration, not instruction. Does not affect module progression.

**Why:** A static curriculum goes stale. But replacing stable content with live content introduces inconsistency and quality risk. The three-layer model keeps the training consistent while acknowledging that the world moves. A learner who wants to know what's happening in AI governance right now can get that — separately, clearly labeled — without the golden path being contaminated by it.

### Exercises for Every Module

All 15 modules have exercises. Earlier versions had 7. The gap was intentional (not every concept needs an exercise) but in practice, reinforcement without application is just exposure.

**Why:** The research on learning retention is clear — application after instruction dramatically improves retention. An exercise that asks "classify these four scenarios" after a module on agent vs. assistant is more valuable than a second explanation of the same concept.

Exercise files are mapped explicitly in `manifest.json` via an `exercise` field — Juno looks up the file directly rather than guessing.

### AGENTS.md Is the Real IP

Everything else in this repo is scaffolding. The behavioral protocol in `AGENTS.md` — the 18-step module protocol, the learning style adaptation rules, the exercise protocol, the escalation routing, the tone rules — is what makes this work. It took significant iteration to get right.

If you're evaluating whether to fork this for a different AI tool, the question is: can that tool read and follow `AGENTS.md`? If yes, the rest is just markdown files.

---

## What's Open

See `docs/CUSTOMIZATION_BACKLOG.md` for the full current backlog. Short version:

1. **Org config** — `org/org-context.md`, `org/escalation.md`, `org/approved-mcps.json` need real values before rolling out to a real team. Templates and a filled-in example (`org/examples/`) are included.
2. **URL verification** — three OpenCode URLs in `further_reading` need to be confirmed live before distributing.
3. **Tool-agnostic variant** — the architecture works in Claude.ai Projects, Cursor, and others. Not yet validated.
4. **Distribution model** — current path (fork → setup → open in OpenCode) works for technical teams. Broader rollout needs a lower-friction option.

---

## Repo Structure

```
AGENTS.md                    Juno's behavioral protocol — read this first
PROGRESS.md.template         Blank learner state — copied by setup.js
manifest.json                Module registry: files, exercises, further reading, search topics
setup.js                     One-time scaffolding (run once per learner)
export.js                    Generates plain-text completion report from PROGRESS.md
modules/                     15 lesson files in plain markdown
exercises/                   15 exercise files — one per module
exercises/templates/         Helper tool example for Module 12
org/                         Org config (live) + templates + examples
assets/                      Juno logo
docs/                        Backlog, industry references, this file
CUSTOMIZATION.md             How to add modules, customize org config, roll out
CONTRIBUTING.md              How to contribute (add modules, edit behavior, edit org config)
```

---

## Version History

| Version | What changed |
|---------|-------------|
| v1.0.0 | Tool-agnostic rebrand (repo: juno-ai-tutor, product: Juno — AI Tutor); platform quick starts for 6 agents; model recommendation; role detection + Role Adaptation section; vocabulary + model differences added to Module 2; iterative prompting added to Module 14; four-part prompt framework forward reference in Module 1 |
| v0.6.0 | Internal pre-release — branding and role detection in progress |
| v0.5.0 | CLI removed; Honey & Mumford learning style evaluation; 8 new exercises (all 15 modules now covered); exercise field in manifest.json; backlog refresh |
| v0.4.0 | Juno name; tutor upgrade (18-step protocol); three-layer architecture; further reading + live research; industry context sections in modules 05/06/09; enterprise tenancy in module 07; token worked example; completion export; world-class README; Juno logo |
| v0.3.0 | Tutor model; three-layer architecture foundations |
| v0.1–0.2 | CLI era — archived and removed |
