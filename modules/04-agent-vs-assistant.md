# Module 3: Agent vs Assistant

## Why This Matters

Many people start with chat tools, so "assistant" feels familiar. OpenCode can do more than a simple chat window, and that is where the word "agent" starts to matter.

## The Simple Picture

An assistant mainly answers questions. An agent can also use approved tools, inspect files, gather information, and help carry out steps within a defined boundary.

## Visual

```text
Assistant: ask -> answer

Agent: ask -> inspect -> use approved tool -> return answer or draft next step
```

## A Practical Example

Assistant behavior:

- "Explain this document in plain language."

Agent behavior:

- "Read these files, compare them, summarize the differences, and suggest a draft response."

Both can be useful. The difference is that the agent can take a more active role because it has access to tools and context.

## Why People Get Nervous

The word "agent" can sound like "fully autonomous." That is not the mental model we want here. In an enterprise setting, an agent should still be bounded by permissions, review points, and human approval.

## Safety Check

When tool access increases, governance matters more, not less. Better capability should come with clearer boundaries.

## What To Remember

Assistant means answer-focused. Agent means answer-plus-approved-action.
