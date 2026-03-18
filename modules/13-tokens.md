# Module 13: Tokens and Practical Limits

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

## Worked Example: Building a Token Budget

You need to review a vendor contract for liability clauses before a renewal meeting. You have:

- A 40-page vendor contract (PDF converted to text)
- A 5-page internal policy on vendor agreements
- A specific question: "Does this contract limit our liability in a way that conflicts with our internal policy?"

**The instinct:** paste everything and ask.

**The token math:**

| What you'd paste | Approximate tokens |
|------------------|-------------------|
| Full 40-page contract | ~12,000 |
| Full 5-page policy | ~1,500 |
| Your question | ~50 |
| **Total** | **~13,550** |

That works — it fits in the context window. But it's slow, expensive, and the model has to find the needle in a haystack.

**The better approach:** scope before you paste.

1. Search the contract for the liability section — it's probably 2–3 pages. (~600–900 tokens)
2. Pull just the relevant paragraph from your internal policy. (~100–150 tokens)
3. Write a specific question with the exact clause numbers you want compared. (~75 tokens)

| Scoped version | Approximate tokens |
|----------------|-------------------|
| Liability section only | ~750 |
| Relevant policy paragraph | ~125 |
| Specific question | ~75 |
| **Total** | **~950** |

Same question. 14x less context. Faster response, lower cost, better focus — the model isn't distracted by 37 pages of unrelated contract language.

**The habit:** before pasting a large document, ask "what section actually answers my question?" Extract that. Leave the rest.

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
