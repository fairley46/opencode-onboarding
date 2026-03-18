# Module 7: Using Markdown to Shape Behavior

## Why This Matters

One of the easiest ways to make AI more useful is also one of the simplest: write down the context and rules you want it to follow.

## The Simple Picture

Markdown files can hold guidance like goals, audience, review rules, tone, and boundaries. In practice, that means you can make OpenCode more consistent without asking a human to re-explain everything every time.

## Visual

```text
Guidance file
  - goal
  - audience
  - boundaries
  - review rules
        |
        v
More consistent behavior across sessions
```

## A Practical Example

A good guidance file might say:

- explain in plain language first
- cite the source when answering policy questions
- do not expose secrets
- ask for approval before suggesting risky actions

That is much more helpful than a vague instruction like "be smart."

## Why It Matters For Governance

These files are not just convenience notes. They shape behavior repeatedly. That makes them part of your governance surface.

## Safety Check

Bad guidance scales bad behavior. Short, specific, reviewed guidance is safer than long, messy instruction dumps.

## Guidance File Format

A good guidance file is short, specific, and reviewed. Here is the format that works well:

```markdown
# [Project or Session Name] Context

## Goal
What this session or project is trying to accomplish.
Example: "Help the team review policy documents for plain-language clarity."

## Audience
Who the output is for, and what they already know.
Example: "Non-technical staff who are new to AI. Avoid jargon."

## Tone
How the AI should communicate.
Example: "Direct, warm, plain language. No bullet lists unless the user asks."

## Boundaries
What the AI should not do in this context.
Example: "Do not make final decisions. Do not share confidential file contents outside this session."

## Review Rules
What needs human sign-off before acting.
Example: "Always ask before modifying a file. Summarize before any bulk action."
```

### Where these files live

- **`AGENTS.md`** — OpenCode reads this at session start. Controls the whole workspace.
- **`CLAUDE.md`** — Anthropic's Claude-specific guidance file, same idea.
- **Project-level context files** — You can create a file like `CONTEXT.md` in any folder for project-specific guidance.

You do not need to name it `AGENTS.md` to get value from it. You can paste guidance directly into a conversation, or create a custom file and point OpenCode to it.

### A minimal real example

```markdown
# Policy Review Context

## Goal
Help me scan internal policy documents for unclear language.

## Audience
Non-technical staff — explain findings simply.

## Boundaries
Read-only. Do not suggest rewrites unless I ask.
Flag anything that looks like a legal obligation or risk — don't interpret it, just flag it.

## Review Rules
Show me the source section before giving a summary.
```

That is 6 lines of guidance. It is more useful than a 2-page prompt because it is specific, reviewable, and reusable.

## What To Remember

Markdown is not "just documentation" here. It is part of how behavior and context are shaped. Keep guidance files short, specific, and reviewed — they scale whatever behavior you put in them.
