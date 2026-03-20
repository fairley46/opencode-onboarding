# Open Backlog

Things still to do. Ordered by priority.

For customization instructions see [CUSTOMIZATION.md](../CUSTOMIZATION.md).

---

## Must Do Before Rolling Out to a Real Team

### 1. Fill in org config

The three live org config files still contain placeholder text. Juno reads these at the start of every session — without real values, learners get unhelpful responses on policy questions.

- [ ] `org/org-context.md` — approved uses, disallowed uses, governance notes
- [ ] `org/escalation.md` — real names and contact info
- [ ] `org/approved-mcps.json` — approved MCP servers, or empty array if none yet

### 2. Verify further_reading URLs

All 15 modules have `further_reading` entries in `manifest.json`. A few URLs need verification before distributing:

- [ ] Confirm OpenCode docs URL resolves (`https://opencode.ai/docs`)
- [ ] Confirm OpenCode extensions URL resolves (`https://opencode.ai/docs/extensions`)
- [ ] Confirm OpenCode community URL resolves (`https://opencode.ai/community`)
- [ ] Consider adding links from OpenAI, Google Gemini, and other providers where relevant — learners benefit from seeing the broader ecosystem, not just Anthropic sources

---

## Medium Priority

### Distribution model

Current distribution (fork repo → npm setup → open in chosen AI agent) works for technical teams. For broader enterprise rollout, a lower-friction path may be needed.

- [ ] Evaluate hosted option — shareable link that opens a pre-configured workspace
- [ ] Consider admin-push model vs each learner setting up themselves

### Verify further_reading URLs

Several further_reading URLs in manifest.json reference OpenCode-specific pages that may not resolve:

- [ ] Confirm `https://opencode.ai/docs` resolves
- [ ] Confirm `https://opencode.ai/docs/extensions` resolves
- [ ] Confirm `https://opencode.ai/community` resolves
- [ ] Consider broadening further_reading links to cover non-Anthropic tools where relevant (Gemini, OpenAI, etc.)

---

## Resolved

**v1.0.0 — Tool-agnostic rebrand + engineering role adaptation (completed 2026-03-19):**
- ✅ Repo renamed: `opencode-onboarding` → `juno-ai-tutor`
- ✅ Product renamed: Juno — AI Tutor throughout
- ✅ AGENTS.md: all OpenCode-specific language removed, agent-agnostic
- ✅ README: platform quick start for OpenCode, Claude Code CLI, Gemini CLI, Codex CLI, Cursor/VS Code, Claude.ai Projects
- ✅ README: model recommendation callout — use most capable model available
- ✅ AGENTS.md: role detection question at session start (Technical vs Non-technical)
- ✅ AGENTS.md: Role Adaptation section — technical learners get deeper framing, non-technical unchanged
- ✅ PROGRESS.md.template: Role field added
- ✅ Module 1: four-part prompt framework forward reference planted at session start
- ✅ Module 2: Key Terms section added (prompt, context window, model, tokens) + On Model Differences
- ✅ Module 14: Prompting Is a Conversation section added — iterative/collaborative prompting pattern
- ✅ package.json: renamed to juno-ai-tutor, bumped to 1.0.0

**CLI removal (completed 2026-03-18):**
- ✅ `archive/cli/` removed — JavaScript CLI was dead weight for a workspace-context product
- ✅ `test/` removed — tests were for the CLI, no longer relevant
- ✅ `test` script removed from package.json

**Learning style evaluation (completed 2026-03-18):**
- ✅ Honey & Mumford 4-question evaluation added to AGENTS.md session start
- ✅ Juno evaluates learner style upfront (before any module) and saves to PROGRESS.md
- ✅ PROGRESS.md.template: `**Learning Style:**` field added
- ✅ Learning Style Adaptation section in AGENTS.md — per-style teaching instructions for Activist, Reflector, Theorist, Pragmatist

**Exercises (completed 2026-03-18):**
- ✅ 8 new exercises added — all 15 modules now have exercises
  - Exercise 08: Trust calibration (module 03)
  - Exercise 09: Agent or assistant (module 04)
  - Exercise 10: Mode selection (module 05)
  - Exercise 11: Data check (module 06)
  - Exercise 12: Permission audit (module 08)
  - Exercise 13: Token budget (module 13)
  - Exercise 14: First workflow (module 14)
  - Exercise 15: Next 30 days (module 15)
- ✅ `exercise` field added to all 15 modules in manifest.json
- ✅ AGENTS.md step 13 updated: Juno looks up exercise file from manifest.json directly

**Juno (completed 2026-03-18):**
- ✅ Tutor named Juno — introduces herself by name at session start

**Tutor upgrade (completed 2026-03-18):**
- ✅ AGENTS.md: reframed agent as tutor (Juno), not facilitator
- ✅ Elicit-prior-knowledge step added to module protocol
- ✅ Connect-backward step — each module opens by linking to the previous
- ✅ Name-the-wrong-model-first instruction added
- ✅ Find-their-analogy instruction added
- ✅ "Does that make sense?" replaced with explain-it-back and diagnostic scenario checks
- ✅ Read-engagement step — Juno slows down and tries a different approach when learner seems lost
- ✅ Visual aids instruction — Juno draws diagrams proactively for relational concepts
- ✅ Module 01: "How This Program Works" orientation section added
- ✅ Session start: Juno explains her teaching approach before beginning Module 1
- ✅ Learner agency reminders added — Juno tells learners their options at pause points
- ✅ "What This Doesn't Mean" (job replacement framing) replaced with "What Gets Better"
- ✅ AGENTS.md Don'ts: no bullet summaries, no invented commands

**Three-layer architecture (completed 2026-03-18):**
- ✅ `further_reading` array added to all 15 modules in manifest.json
- ✅ AGENTS.md: Juno offers further reading after module rating (optional)
- ✅ AGENTS.md: Juno always offers live research after further reading
- ✅ Live research framed as exploration, not training — clearly separate from golden path
- ✅ Live Research section added to AGENTS.md for mid-session research requests
- ✅ Fixed: live research offer was conditional on agent knowing search capability — now unconditional
- ✅ `search_topics` field added to modules 05, 06, 09 in manifest.json

**Content (completed 2026-03-18):**
- ✅ Module 05: Industry Context section — AI autonomy governance debate
- ✅ Module 06: Industry Context section — data residency regulation landscape
- ✅ Module 07: Enterprise tenancy section — org tenant vs personal account, comparison table, verification steps
- ✅ Module 09: Industry Context section — MCP ecosystem evolution
- ✅ Module 13: Worked token budget example — vendor contract scenario (13,550 vs 950 tokens)
- ✅ Exercise 07: rewritten from stub with paste test and tenancy verification
- ✅ Module 01: "What Gets Better" reframe — acceleration and capability, not job security
- ✅ Modules 04, 06, 08, 15 expanded to substantive depth
- ✅ Modules 03, 05, 07 added (curriculum expanded 12 → 15 modules)
- ✅ All 15 module H1 headers corrected
- ✅ Exercises 01, 02, 03, 04 rewritten from stubs

**Repo (completed 2026-03-18):**
- ✅ README rewritten to world-class standard: badges, quick start at top, scannable table, single diagram
- ✅ SECURITY.md updated — removed CLI-era references, reflects current architecture
- ✅ THREAT_MODEL.md updated — removed CLI-era references, added tenancy and wrong-access-path risks
- ✅ GitHub repo About section: description, topics, homepage
- ✅ org/examples/ added — fictional "Meridian Analytics" org-context and escalation examples
- ✅ export.js + `npm run export` — generates plain-text completion report from PROGRESS.md
- ✅ v0.3.0 and v0.4.0 releases published
