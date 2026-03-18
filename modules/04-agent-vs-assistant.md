# Module 4: Agent vs Assistant

## Why This Matters

When you use a chat tool to ask a question and get an answer, that's assistant behavior. When you ask OpenCode to read three files, compare them, draft a summary, and save it — that's agent behavior. The difference is not just technical. It changes what you need to review, what can go wrong, and how much trust you're placing in the system.

Understanding this distinction is one of the most important things you can learn before you start doing real work in OpenCode.

## The Simple Picture

An assistant takes a prompt and returns a response. That's the whole interaction.

An agent takes a prompt and can take a sequence of actions to fulfill it — reading files, calling approved tools, making decisions about what to do next, and producing a result after multiple steps.

```text
Assistant: you ask -> AI answers -> done

Agent:     you ask -> AI reads files -> AI calls a tool -> AI reasons
                   -> AI produces result -> done
                   (multiple steps, some invisible to you)
```

The assistant model is easier to verify. You see the input, you see the output, you evaluate it.

The agent model is more powerful but requires more attention. Some steps happen between your prompt and the final answer. Understanding what those steps are — and what access they required — is part of using agents safely.

## A Practical Example

You are preparing for a vendor review. You have three documents: the vendor's proposal, your org's standard requirements checklist, and notes from a previous review meeting.

**Assistant approach:**
You paste the proposal into a chat and ask: "Does this look complete?" You get a general answer based on whatever the model knows. It hasn't seen your checklist or your meeting notes.

**Agent approach:**
You say: "Read the vendor proposal, the requirements checklist, and the meeting notes. Tell me which requirements are met, which are missing, and flag anything that contradicts what we discussed in the meeting."

The agent reads all three files, works through the comparison, and gives you a structured answer grounded in your actual documents. That is substantially more useful — and it happened because the agent had approved access to those files and used it.

## Why "Agent" Can Feel Scary

The word "agent" suggests autonomy. That's reasonable to be cautious about. But in an enterprise setting, autonomy is bounded:

- The agent can only use tools and files you've given it access to
- It can't reach outside the permissions that have been configured
- Every action it takes can be reviewed
- You can interrupt or redirect it at any point

The risk isn't that an agent will do something arbitrary. The risk is that you'll give it a task that's broader than you intended, or connect it to a tool with more access than the task needs. Those are scope and permission questions — which is exactly what the next few modules cover.

## What Increases When You Use an Agent

More capability means more things to be aware of:

- **More context is used.** The agent reads files and tools to do its job. That context is part of the prompt.
- **More steps happen.** You can't always see every intermediate decision the agent made.
- **More access may be exercised.** If you've connected an approved tool, the agent might query it as part of answering your question.
- **Review gets more important.** When one step affects the next, a mistake early in the chain affects the whole result.

None of these are reasons to avoid agent workflows. They're reasons to be deliberate about what you ask for and what access you give.

## How to Think About It Day to Day

Most of your early work in OpenCode will look like assistant behavior — ask, read the answer, decide what to do with it. That's fine and useful.

When you start asking OpenCode to work across multiple files, use connected tools, or carry out multi-step tasks, you're moving into agent territory. That's when it's worth slowing down and being explicit about:

- what sources should be used
- what the output should look like
- what the AI should not decide on its own

Being explicit about those three things turns a vague agent task into a well-governed one.

## Safety Check

The question to ask before any agent task: "What access does this require, and am I comfortable with that?" If you don't know what access is active, Plan Mode is a good place to start — it shows you what the agent would do before it does anything.

## What To Remember

Assistant means answer-focused. Agent means answer-plus-action. More capability requires more clarity about scope, access, and review.
