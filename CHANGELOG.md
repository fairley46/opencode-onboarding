# Changelog

All notable changes to Juno are documented here.

---

## [1.2.0] — 2026-03-24

### Technical track with personalized learning path

Technical users now get met where they are. Juno assesses AI familiarity upfront and builds a personalized path — no more sitting through basics they already know.

**Personalized path assessment**
- Replaced direct "are you technical?" question with a warm AI familiarity question that captures role implicitly
- For experienced users: two targeted follow-ups (worked with agents? familiar with MCP?) build a personalized module path
- Path shown to the learner before any module starts: "10 modules instead of 15 — here's what we're covering"

**Skippable modules** — 02, 04, 06, 09, 13
- In-module check-ins replace full teaching when the learner demonstrates prior knowledge
- Exercises always run — knowledge is confirmed, not assumed
- If a learner struggles with the exercise, Juno slows down and teaches the full module

**Module 01 fast-track for technical users**
- Skips psychological safety framing — a technical user doesn't need "AI isn't scary"
- Goes straight to: how Juno works, the 4-part prompt structure, the accountability habit
- Target: 5 minutes, not 8

**Learning style evaluation**
- Non-technical learners: 4-question evaluation (unchanged)
- Technical learners: 1 question — enough signal, far less friction before the first module

**Technical track exercise variations** — modules 05, 07, 08, 12
- Module 05: scenario-based agent setup walkthrough (blast radius thinking, pre-task checks, intervention signals)
- Module 07: threat model exercise — identify attack surface on a real workflow
- Module 08: least-privilege permission design from scratch
- Module 12: deeper code discussion, security design instincts pushed, no hand-holding

**PROGRESS.md**
- New fields: `AI Familiarity` and `Skip Modules` — personalized path persists across sessions

---

## [1.1.0] — 2026-03-18

### Golden paths

- Added golden paths — org-defined prompt templates surfaced by Juno in Module 14 and opportunistically throughout sessions
- `org/golden-paths.md` ships with five pre-built templates; orgs add their own patterns in the same file
- Juno surfaces relevant golden paths when a learner asks how to approach a task that matches a known pattern
- See `CUSTOMIZATION.md` for how to add org-specific golden paths

---

## [1.0.2] — 2026-03-15

- Docs updated to reflect golden paths and tool-agnostic architecture throughout

## [1.0.1] — 2026-03-12

- Renamed to Juno across all files and docs

## [1.0.0] — 2026-03-10

### First stable release

- 15 modules, 15 exercises, ~2 hours total
- Learning style evaluation (Activist / Reflector / Theorist / Pragmatist)
- Role adaptation (technical / non-technical)
- Three-layer architecture: golden path + further reading + live research
- Per-learner progress tracked in `PROGRESS.md`
- Works across OpenCode, Claude Code CLI, Gemini CLI, Cursor, Claude.ai Projects

---

## [0.6.0] — 2026-03-05

- Tool-agnostic rebrand — removed OpenCode-specific references, works with any AI agent that reads `AGENTS.md`
- Engineering role adaptation added to AGENTS.md

## [0.5.0] — 2026-02-28

- Learning style evaluation added (4-question Honey & Mumford assessment)
- 8 new exercises — full exercise coverage across all 15 modules
- Removed CLI-era artifacts

## [0.4.0] — 2026-02-20

- Token worked example added to Module 13
- Example org config added
- Completion export (`npm run export`) added

## [0.3.0] — 2026-02-14

- Industry context sections and `search_topics` added to modules 05, 06, 09
- Live research layer: Juno can search current industry developments on demand
- Further reading layer: curated links per module offered after rating

## [0.2.0] — 2026-02-07

- Upgraded AGENTS.md from facilitator to tutor model
- Mandatory exercises, one module at a time, teach not summarize
- Enterprise tenancy section added to Module 07
- Visuals encouraged proactively throughout

## [0.1.0] — 2026-01-30

- Initial scaffold: 15 modules, workspace architecture, AGENTS.md protocol
