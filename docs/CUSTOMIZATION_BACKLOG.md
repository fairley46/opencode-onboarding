# Open Backlog

Things still to do before this is fully production-ready. Ordered roughly by priority.

For customization instructions (how to add modules, fill in org config, etc.) see [CUSTOMIZATION.md](../CUSTOMIZATION.md).

---

## High Priority

### Content gaps in modules 8 and 11

**Module 8 — Asking Questions Across Tools**
Currently thin. Needs a concrete example showing what "asking across tools" actually looks like — e.g., combining an approved MCP source with a local file and the AI's reasoning in a single answer. Should include a "what to watch for" note about conflicting sources.

**Module 11 — First Useful Workflows**
Currently thin. Needs 2–3 concrete workflow examples with step-by-step prompts a learner could copy and adapt. Good candidates: policy review, document comparison, meeting prep. Should match what the org's learners actually do.

---

### End-to-end facilitator test

The full experience hasn't been tested cold in OpenCode. Before rollout:
- [ ] Open the folder in OpenCode with no prior context
- [ ] Verify the AI greets correctly, explains the program, starts module 1
- [ ] Complete module 1 and verify PROGRESS.md updates
- [ ] Ask a side question mid-module, verify facilitator tone and return-to-module behavior
- [ ] Test escalation routing: ask a policy question, verify it routes to org/escalation.md contacts
- [ ] Test with placeholder org config (should note that contacts aren't configured yet)
- [ ] Test with filled-in org config

---

## Medium Priority

### Exercise 03 (Connect an Approved MCP)

Needs the same treatment as exercises 4 and 6 — currently just 5 thin bullets with no concrete deliverable or completion criteria. Blocked until the org fills in `org/approved-mcps.json` with a real server, since the exercise needs a real target.

### Org config rollout

The org config files (`org/org-context.md`, `org/escalation.md`, `org/approved-mcps.json`) still have placeholder instructions. Replace with real values before piloting with actual learners.

### Module 11 workflow choices

Module 11 ("First Useful Workflows") should reflect workflows the specific org's learners will actually use. This requires input from whoever is running the program — which use cases are approved, which are best for non-technical staff, which to avoid in V1.

---

## Repo Cleanup and Professionalization

The repo works but isn't ready for external contributors or broad distribution. Needs a dedicated pass to:

- **Audit and prune `docs/`** — several files (`IMPLEMENTATION_SPEC.md`, `DESKTOP_TEST_RUNBOOK.md`, `TEST_STRATEGY.md`) are CLI-era artifacts. Review each: update to reflect the current architecture, or remove.
- **Consolidate org files** — `org/` has both live files and templates side-by-side, which is confusing. Consider `org/templates/` subdirectory to separate them cleanly.
- **Add `CONTRIBUTING.md`** — how to add a module, how to suggest changes, how to report issues. Required before external contributors can participate.
- **Audit `examples/` and `schemas/`** — both exist in the repo but are unreviewed. Verify they're current and useful, or remove.
- **Clean up `archive/cli/`** — the archived CLI is in the repo but nothing points to it or explains it in the README. Either add a brief note in the README under a "Prior Architecture" section or move it to a branch.
- **Add a `LICENSE` file** — currently missing. Choose and add one.
- **Review `SECURITY.md`, `THREAT_MODEL.md`, `SAFE_DEFAULTS.md`** — written for the CLI architecture. Some sections (diagnostics export, local state file paths) are now out of date.
- **`package.json` description and name** — ensure they reflect the current purpose and are appropriate for public distribution.

---

## Low Priority / Nice to Have

### Completion certificate or export

Right now PROGRESS.md is the only record of completion. Some orgs may want a lightweight export (PDF or plain text) showing modules completed and dates. Could be a simple setup.js addition.

### AGENTS.md tone variants

The facilitator tone is currently set for a general enterprise audience. Some orgs may want a more technical tone for engineering teams, or a gentler tone for less tech-comfortable audiences. Could ship as alternative AGENTS.md templates.

### Exercises 1 and 2

Both are thin bullet-point stubs. Exercise 1 (Connect and Confirm) and Exercise 2 (Inspect) would benefit from the same rewrite exercise 4 and 6 got — concrete deliverable, completion criteria, common confusion section.

### Example completed org config

A filled-in example of `org/org-context.md` and `org/escalation.md` (clearly marked as fictional) would help admins understand the expected depth and format faster than reading the templates.
