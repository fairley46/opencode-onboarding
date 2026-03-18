# Open Backlog

Things still to do before this is fully production-ready. Ordered by priority.

For customization instructions (how to add modules, fill in org config, etc.) see [CUSTOMIZATION.md](../CUSTOMIZATION.md).

---

## Must Do Before First Real Learner

### 1. Fill in org config

The three live org config files still contain placeholder instructions. The AI reads these at the start of every session — without real values, learners get unhelpful responses on policy questions.

- [ ] `org/org-context.md` — approved uses, disallowed uses, governance notes
- [ ] `org/escalation.md` — real names and contact info for AI, policy, and security questions
- [ ] `org/approved-mcps.json` — approved MCP servers, or empty array if none yet

See `org/*.template.*` files for the expected format.

### 2. End-to-end facilitator test

The full experience has not been cold-tested in actual OpenCode. This is the biggest unknown — we don't know if AGENTS.md produces the right AI behavior until someone opens it and walks through it.

- [ ] Open the folder in OpenCode with no prior context
- [ ] Verify the AI greets correctly, explains the 15-module program, offers to start
- [ ] Complete module 1 and verify PROGRESS.md updates
- [ ] Ask a side question mid-module, verify facilitator tone and return-to-module behavior
- [ ] Test escalation routing — ask a policy question, verify it routes to org/escalation.md contacts
- [ ] Test with placeholder org config (AI should note contacts aren't configured yet)
- [ ] Test with filled-in org config
- [ ] Test the terminal handoff in exercise 06 — open terminal, run the script, come back, verify facilitator responds correctly

---

## Medium Priority

### Update SECURITY.md and THREAT_MODEL.md

Both files were written for the old CLI architecture. Some sections reference diagnostics exports, survey submissions, and local state file paths that no longer apply. Worth a review pass before broad distribution.

### Module 13 — Tokens: add a worked example

The sizing table and rule of thumb are solid. A worked token budget example would make it more concrete — e.g., deciding what to include vs. exclude when preparing a long document for a prompt.

### Org config templates — consider consolidating

`org/` currently has both live files and `*.template.*` files side by side. An `org/templates/` subdirectory would make it clearer which files admins should edit. Requires updating `setup.js` copy logic.

---

## Low Priority / Nice to Have

### Example completed org config

A filled-in fictional example of `org/org-context.md` and `org/escalation.md` (clearly marked as example) would help admins understand the expected depth and format faster than reading the templates alone.

### AGENTS.md tone variants

The facilitator tone is set for a general enterprise audience. Some orgs may want a more technical tone for engineering teams or a gentler tone for less tech-comfortable staff. Could ship as alternative AGENTS.md templates in `org/templates/`.

### Completion export

PROGRESS.md is the only record of completion. Some orgs may want a lightweight plain-text or PDF export showing modules completed with dates. Could be a simple `npm run export` addition to setup.js.

### Module 11 — org-specific workflow examples

The multi-source prompting examples in module 11 are currently generic. Orgs could replace them with examples specific to their actual approved tools and workflows once org config is filled in.

---

## Resolved

**Content (completed 2026-03-18):**
- ✅ Module 01: job security framing + psychological safety sections
- ✅ Module 03 (new): When to Trust AI Output — two-question framework, hallucination patterns, verification matrix
- ✅ Module 05 (new): OpenCode Modes — plan/edit/agent control ladder, governance framing
- ✅ Module 07 (new): Data Safety and Shadow AI — never-paste table, shadow AI explainer
- ✅ Module 09: concrete MCP setup steps (where to click, fields, verification)
- ✅ Module 10: guidance file template added
- ✅ Module 11: full rewrite — concrete worked example, four-element framework, conflicting sources section
- ✅ Module 12: annotated policy-lookup.js with design rationale
- ✅ Module 13: ~300 tokens/page rule of thumb and sizing table
- ✅ Module 14: rewritten with four-part prompt framework and 3 copy-and-adapt templates
- ✅ All 15 module H1 headers corrected to match file numbering
- ✅ Visuals added to module 03 (verification matrix) and module 07 (safety table)

**Exercises (completed 2026-03-18):**
- ✅ Exercise 01: full rewrite — two-question diagnostic, completion criteria, facilitator note
- ✅ Exercise 02: full rewrite — boundary mapping, test a boundary, completion criteria
- ✅ Exercise 03: full rewrite — four-part task, prerequisite gate, completion criteria
- ✅ Exercise 04: rewritten with concrete deliverable (create CONTEXT.md) and completion checklist
- ✅ Exercise 06: rewritten with 3-part structure and terminal handoff instructions
- ✅ Terminal handoff protocol added to AGENTS.md exercise section

**Repo (completed 2026-03-18):**
- ✅ Curriculum expanded: 12 → 15 modules, ~90 min → ~2 hours
- ✅ README rewritten: session simulation, architecture diagram, learner journey flowchart
- ✅ CONTRIBUTING.md and LICENSE (MIT) added
- ✅ Removed CLI-era docs: DESKTOP_TEST_RUNBOOK.md, TEST_STRATEGY.md
- ✅ Removed orphaned directories: examples/, schemas/, facilitator/
- ✅ package.json version bumped to 0.3.0
