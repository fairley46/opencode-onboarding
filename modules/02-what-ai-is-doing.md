# Module 2: What AI Is Doing Here

## Why This Matters

Before you connect tools or change any setup, it helps to know what the model is actually doing. If you understand that, the rest of the onboarding feels much less mysterious.

## The Simple Picture

At a practical level, the AI reads the instructions you give it, the context you share, and any approved tool output it is allowed to use. Then it produces the most useful next response it can. It is not automatically aware of your company, your files, or your intent unless that context is available.

## Visual

```text
Your goal + your context + approved tools
                  |
                  v
              AI model
                  |
                  v
        draft, summary, explanation, plan
```

## Key Terms

These words come up constantly. It helps to have them defined before they start appearing in context.

**Prompt** — the instruction or question you give the AI. Everything starts here. The quality of what you get back is directly tied to how clearly you write it. A vague prompt gets a vague answer. A specific prompt with a clear goal, context, and format gets a useful one.

**Context window** — the total amount of text the model can hold in working memory at once: your instructions, any documents you have shared, and the conversation so far. Think of it as the model's desk. Only what is on the desk is available to it. If your conversation gets long enough, earlier parts scroll off — the model stops being able to see them.

**Model** — the underlying AI system that reads your input and produces output. Different models have different capabilities, speeds, and costs. When you hear "which model are you using?", this is what they mean.

**Tokens** — the units the model uses to process text. You do not need to count them, but knowing they exist explains why larger inputs cost more and sometimes slow things down. Roughly 300 tokens ≈ one page of plain text. Module 13 goes deeper on this.

## On Model Differences

New models are released regularly. When you hear about a new release, the practical question is: does it follow instructions more reliably, reason more accurately, or handle more context? Usually the answer is yes — and that directly affects the quality of your results.

You do not need to track every release. A good default: when your tool offers a model choice, use the most capable one available. The difference between a current frontier model and a model from a year ago is meaningful — like the difference between a sharp tool and a dull one. For a program like this one, where the tutor is following a detailed behavioral protocol, a stronger model follows it more faithfully.

## The Technical Term

You may hear this described as a model using prompt context plus tool results.

## A Practical Example

If you ask, "Summarize this policy and tell me what changed from last year's version," the quality of the answer depends on:

- how clearly you ask
- which files or tools are available
- whether the system can see both versions

## Safety Check

More context is not always better. Large, messy context can make results slower, more expensive, and less reliable. A good habit is to give the smallest useful amount of information for the task.

## What To Remember

AI does not "just know." It works from instructions, context, and access.
