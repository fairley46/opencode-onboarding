# Module 10: Tokens and Practical Limits

## Why This Matters

Tokens sound technical, but the practical idea is simple: the system has a text budget. Understanding that budget helps learners work more clearly and efficiently.

## The Simple Picture

Every prompt, file snippet, tool result, and answer takes up room. The more room you use, the more the system has to process.

## Visual

```text
Small useful context  -> easier focus
Huge mixed context    -> more noise, more cost, slower answers
```

## A Practical Rule of Thumb

~300 tokens ≈ one page of plain text (roughly 225 words).

| What you're sharing | Approximate tokens |
|---------------------|-------------------|
| One short paragraph | ~75–100 |
| One A4 page of text | ~300 |
| A typical email | ~150–300 |
| A 10-page policy doc | ~3,000 |
| A medium code file (200 lines) | ~500–1,500 |
| A large log dump | Can be 10,000+ |

These are rough guides, not exact counts. Different models and languages have different token rates, but the ballpark holds for English prose.

**What this means in practice:**
- Most useful questions need 500–2,000 tokens of context
- A 200k-token context window holds ~600 pages — more than you'll ever need for one task
- Cost scales with tokens in AND tokens out — long outputs cost more than short ones
- Focus is more important than size: a relevant 1-page excerpt beats a vague 20-page dump

## A Practical Example

If you provide:

- a short task description
- one relevant file
- one targeted question

the system usually performs better than if you paste:

- five long documents
- raw logs
- vague instructions

## Why It Matters

Too much context can lead to:

- slower responses
- higher cost
- more noise
- weaker focus

## Safety Check

Large outputs can also increase risk because they pull in more information than the task really needs.

## What To Remember

Think focused, not maximal. Give the system the smallest useful working set.
