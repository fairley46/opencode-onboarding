# OpenCode Onboarding

Guided AI onboarding that runs inside OpenCode. The AI facilitates. You learn.

This program is designed for non-technical and technical-adjacent learners who may be new to AI tools, unsure how agents work, or nervous about using AI in a work context. The goal is to build safe, practical habits in the same environment where the work actually happens.

## Quick Start

### Requirements

- Node.js 20+ (for setup only)
- OpenCode (desktop or terminal)

### Setup

```bash
git clone https://github.com/fairley46/opencode-onboarding.git
cd opencode-onboarding
npm run setup
```

Setup copies org config templates and creates a blank `PROGRESS.md`. That's all it does.

**Optional but recommended:** Edit `org/org-context.md` and `org/escalation.md` with your organization's policies and escalation contacts before giving this to learners.

### Begin Onboarding

Open this folder in OpenCode. The AI reads `AGENTS.md` and starts the onboarding automatically.

That's it. No commands to remember. No CLI to run.

## How It Works

This is a workspace-context experience, not a CLI app:

- **`AGENTS.md`** tells OpenCode its role: warm facilitator, 12-module curriculum, exercise protocol, org policy routing
- **`modules/`** contains the lesson content — OpenCode reads and presents each module conversationally
- **`org/`** contains your org-specific context — approved use, disallowed use, escalation contacts
- **`PROGRESS.md`** tracks the learner's state — OpenCode updates it after each module completes

## Adding a Module

1. Create a markdown file in `modules/`
2. Add one entry to `manifest.json`

No code changes needed.

## Customizing for Your Org

1. Edit `org/org-context.md` — approved use, disallowed use, governance notes
2. Edit `org/escalation.md` — who learners contact for policy, security, and support questions
3. Edit `org/approved-mcps.json` — which MCP servers are approved

See `org/*.template.*` files for the format.

## What the Onboarding Teaches

12 modules covering:

1. Welcome and Safety — what this program is, what the learner is accountable for
2. What AI Is Doing Here — a plain-language model of what's happening inside OpenCode
3. Agent vs Assistant — the difference, and why it matters for trust and oversight
4. Local vs Web Execution — what runs where, what leaves the machine
5. Guard Rails and Permissions — how permissions work, least privilege, review habits
6. What MCP Is and Why It Matters — what MCP tools do and how they're controlled
7. Using Markdown to Shape Behavior — how guidance files work, AGENTS.md, CLAUDE.md
8. Asking Questions Across Tools — how to get useful answers from multiple sources
9. Build a Tiny Helper Tool — hands-on: create a simple helper that actually works
10. Tokens and Practical Limits — what tokens are, practical limits, cost intuition
11. First Useful Workflows — concrete workflows the learner can use starting now
12. Troubleshooting and Next Steps — what to do when things go wrong, where to go next

## Project Structure

```
AGENTS.md               OpenCode facilitator instructions (start here)
PROGRESS.md             Learner progress (created by setup)
manifest.json           Module list with file paths and time estimates
setup.js                One-time scaffolding script
modules/                Lesson content (12 markdown files)
exercises/              Exercise prompts
org/                    Org-specific config and templates
archive/cli/            Original Node.js CLI (archived, not used)
docs/                   Implementation notes and references
```

## Security Posture

- No hidden telemetry
- No install hooks
- Local-only learner state
- Read-only-first training patterns
- No external network calls from setup script

See [SECURITY.md](SECURITY.md), [THREAT_MODEL.md](THREAT_MODEL.md), [SAFE_DEFAULTS.md](SAFE_DEFAULTS.md).
