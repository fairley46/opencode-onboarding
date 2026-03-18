# Module 5: OpenCode Modes: Plan, Edit, and Agent

## Why This Matters

OpenCode has different operating modes that give the AI different levels of autonomy. Choosing the right mode is not a technical detail — it is a governance decision. Understanding what each mode can do puts you in control.

## The Three Modes

### Plan Mode

In Plan mode, the AI thinks through what it would do — and stops there. It proposes actions, explains its reasoning, and waits for your approval before doing anything.

**What the AI can do:** Read files, analyze your request, draft a plan of action.
**What the AI cannot do:** Edit files, run commands, take any action.
**When to use it:** Anytime you want to understand what the AI intends before letting it act. Use it for unfamiliar tasks, anything touching important files, or any time you want to review before committing.

```text
You: "Review this folder and suggest what to clean up."
AI in Plan Mode: reads files, lists what it would delete or change, waits for your go-ahead
```

### Edit Mode

In Edit mode, the AI can read files and make direct edits. It can propose changes and write them. It cannot run programs or take actions outside of file editing.

**What the AI can do:** Read and write files.
**What the AI cannot do:** Run commands, execute code, make network requests.
**When to use it:** Drafting, revising, or reorganizing files where you're comfortable with direct edits. Lower risk than Agent mode because the scope is limited to file changes.

```text
You: "Rewrite this summary in plain language."
AI in Edit Mode: edits the file directly
```

### Agent Mode

In Agent mode, the AI can take a broader range of actions — running commands, executing code, making multiple changes in sequence. It has the most autonomy and therefore the most potential impact.

**What the AI can do:** Read files, write files, run commands, execute multi-step workflows.
**What the AI cannot do:** Act outside the permissions and tools you have configured.
**When to use it:** Tasks that genuinely need multi-step execution — running tests, scaffolding a project, automated workflows. Not for exploratory or unfamiliar tasks.

```text
You: "Run the test suite and fix any failing tests."
AI in Agent Mode: runs tests, reads output, edits files, re-runs until passing
```

## The Control Ladder

```text
Plan Mode    →  AI proposes, you approve, nothing happens yet
Edit Mode    →  AI can change files, cannot run anything
Agent Mode   →  AI can act broadly within configured permissions
```

Each step up gives the AI more capability — and requires more trust that the task is well-defined and the boundaries are clear.

## How to Choose

Start with the least-capable mode that can accomplish the task.

- Not sure what the AI will do? → Plan Mode first.
- Clear task, file changes only? → Edit Mode.
- Multi-step execution, well-understood task? → Agent Mode.

If you find yourself in Agent mode on an unfamiliar task, that's a signal to step back to Plan mode and review the proposed approach first.

## Why This Is a Governance Decision

The mode you choose determines what the AI is allowed to do without a checkpoint. Plan mode requires your approval before every action. Agent mode may complete many steps before pausing.

In an enterprise context, the right default for new or unfamiliar tasks is Plan mode. The right mode for well-understood, low-risk workflows can be higher. Your org's policy will define which modes are appropriate for which contexts — if it doesn't yet, that's worth asking about.

## Safety Check

When in doubt, drop down a mode. It costs a few extra seconds. Reversing an unintended action in Agent mode can cost much more.

## Industry Context

The plan/edit/agent distinction in OpenCode reflects a much bigger question the entire AI industry is wrestling with right now: how much autonomy should AI have, and who is responsible when it acts?

Every major AI tool is navigating a version of this. Some default to high autonomy and let users dial it back. Others default to read-only and require explicit permission to act. The terminology differs — "agentic mode," "autopilot," "full auto" — but the underlying control ladder is the same concept. More autonomy means faster results and fewer checkpoints. Less autonomy means more review and more confidence in what happened.

What's being actively debated at the industry level is governance: who decides what autonomy level is appropriate for which tasks, in which contexts, for which roles. Most enterprises have not answered this yet. The orgs that will handle AI well are the ones building explicit policies now — before an agent mode incident forces the conversation.

Your org's answer to "what mode for what context" is a governance decision, not a technical preference. If your org doesn't have a policy on this yet, the question is worth raising. This module gives you the vocabulary to have that conversation.

## What To Remember

More capable mode = less human review per step. Match the mode to the task and your confidence level.
