# Customization Guide

How to adapt this onboarding program for your organization.

---

## Architecture Overview

Three files control everything:

- **`AGENTS.md`** — controls how the AI facilitator behaves: its role, pedagogical approach, tone, escalation rules, and the full curriculum table. Changes here take effect immediately on next session open.
- **`manifest.json`** — controls module order, time estimates, and the curated further reading links shown after each module. The AI reads this to know what to present and in what sequence.
- **`modules/`** — the lesson content itself. Each module is a plain markdown file. The AI reads the file, then presents it conversationally.

Everything else (exercises, org config, PROGRESS.md) connects to one of these three.

---

## Before You Roll Out

Run setup first if you haven't:

```bash
npm run setup
```

This copies the org config templates and creates `PROGRESS.md`. After that, the three things you need to fill in are:

1. `org/org-context.md` — approved use, disallowed use, governance notes
2. `org/escalation.md` — who learners contact for policy, AI, and security questions
3. `org/approved-mcps.json` — which MCP servers are approved for learners

The `org/*.template.*` files show the expected format for each.

---

## Adding a Module

Adding a module is two steps.

**Step 1:** Create a markdown file in `modules/`:

```
modules/16-my-new-module.md
```

Use the same structure as existing modules:

```markdown
# Module 16: Your Title

## Why This Matters
[One paragraph — why should the learner care?]

## The Simple Picture
[Plain-language explanation of the concept]

## A Practical Example
[Concrete example the learner can relate to]

## Safety Check
[What to watch out for]

## What To Remember
[One or two sentences to take away]
```

**Step 2:** Add one entry to `manifest.json` in the `modules` array, in the position you want it to appear:

```json
{
  "id": "16-my-new-module",
  "title": "Your Title",
  "file": "modules/16-my-new-module.md",
  "estimatedMinutes": 10,
  "further_reading": []
}
```

That's it. No code changes. The AI reads the module table from `AGENTS.md` and the file list from `manifest.json` — update both if you want the module to appear in the curriculum table the AI displays.

---

## Adding Further Reading Links

Each module in `manifest.json` has a `further_reading` array. Add entries there to offer optional links after that module completes.

```json
"further_reading": [
  {
    "title": "Link Title",
    "url": "https://example.com",
    "description": "One sentence on why it's worth reading."
  }
]
```

The facilitator presents these after the learner rates the module, offers them as optional, and presents each with its title, URL, and your description. If the array is empty, the facilitator skips the further reading offer entirely.

You can update, replace, or remove any link by editing `manifest.json`. No other files need to change.

---

## Adding an Exercise

Create a markdown file in `exercises/`:

```
exercises/16-my-exercise.md
```

Structure:

```markdown
# Exercise 16: Your Title

## Learner Objective
[One sentence — what will the learner understand after this?]

## What You'll Create / Explore
[Concrete deliverable or activity]

## The Task
[Step-by-step instructions — be specific enough that the learner can do it without help]

## Completion Criteria
- [ ] [Specific thing that shows it's done]
- [ ] [Another specific thing]

## Common Confusion
[What typically trips people up, and how to handle it]

## Facilitator Note
[One line of guidance for the AI facilitator]
```

The facilitator finds the matching exercise by module number. To make the connection explicit, add an `exercise` field to the module's `manifest.json` entry:

```json
"exercise": "exercises/16-my-exercise.md"
```

---

## Editing Facilitator Behavior

All facilitator behavior is controlled by `AGENTS.md`. To change how the AI behaves:

- **Tone** — edit the "Tone and Interaction Rules" section
- **Curriculum order** — reorder the module table in the "Curriculum" section
- **Escalation rules** — edit the "When to Escalate" section
- **Topics to avoid** — edit the "Topics to Avoid" section
- **Session start behavior** — edit the "Session Start Checklist" section
- **Teaching approach** — edit the "How to Run a Module" section

Changes to `AGENTS.md` take effect immediately on next session open.

---

## Editing Org Config

| File | What it controls |
|------|-----------------|
| `org/org-context.md` | Approved use, disallowed use, governance notes (read every session) |
| `org/escalation.md` | Who learners contact for policy, AI, and security questions |
| `org/approved-mcps.json` | Which MCP servers are approved for use |

Edit these directly. The facilitator reads them at session start and uses them to answer policy-adjacent questions and route escalations.

---

## Rollout Checklist

Before giving this to learners:

- [ ] Fill in `org/org-context.md` (approved and disallowed use)
- [ ] Fill in `org/escalation.md` (real contacts, not placeholders)
- [ ] Fill in `org/approved-mcps.json` (or set to empty array if none are approved yet)
- [ ] Review `AGENTS.md` tone and escalation rules — do they match your org's culture?
- [ ] Test: open this folder in your AI agent of choice and verify Juno greets correctly and cites the right escalation contacts
- [ ] Optional: add org-specific modules for your tools, workflows, or policies

---

## Giving Learners Access

The simplest rollout:

1. Fork or copy this repo
2. Fill in the org config files
3. Share the repo URL with learners (or pre-clone it for them)
4. Learners run `npm run setup`, then open the folder in their AI agent of choice (see README for platform-specific instructions)

Each learner gets their own `PROGRESS.md` — it is local and gitignored, so it won't conflict across users.
