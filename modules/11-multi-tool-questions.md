# Module 11: Asking Questions Across Tools

## Why This Matters

OpenCode can pull from multiple sources in a single answer — an approved MCP, a local file, and its own reasoning — and synthesize them into something more useful than any one source alone. Most beginners don't do this. They ask one question, get one answer, and miss the compounding value.

This module is about building the habit of naming your sources and shaping the answer you want.

## The Simple Picture

A single prompt can direct the AI to use multiple approved sources. The result is an answer that combines what your org has formally documented, what's in the files you're working with, and the AI's reasoning — all in one place.

The key is being explicit. If you don't name the sources, the AI picks whatever it thinks is relevant. That's less predictable and harder to verify.

## A Worked Example

**Scenario:** You need to know whether a vendor contract clause conflicts with your org's data retention policy before a meeting in an hour.

**Without multi-source prompting:**
> "Does this contract clause create a data retention problem?"

The AI reasons from general knowledge. You get a plausible answer with no grounding in your actual policy.

**With multi-source prompting:**
> "I'm going to give you two sources. First, read the attached contract clause. Second, read our data retention policy from the approved docs source. Tell me:
> 1. What the contract requires
> 2. What our policy requires
> 3. Whether they conflict — and if so, where specifically
> Do not recommend a course of action. I'll take it to legal."

What changes:
- The AI is grounded in your actual documents, not general knowledge
- The answer is structured and checkable — you can verify each point against the source
- The review boundary is clear: the AI analyzes, you decide
- You walk into the meeting with a specific question for legal, not a vague concern

## The Four Elements in a Multi-Source Prompt

1. **Name each source** — "read the contract clause" / "use the approved policy doc"
2. **State the goal** — what comparison, gap, or synthesis you need
3. **Set the output format** — numbered list, short summary, side-by-side
4. **Set the review boundary** — what the AI should not decide for you

Missing any of these tends to produce a longer answer that's harder to verify.

## What to Watch For: Conflicting Sources

When sources disagree, AI output can blend them rather than flag the conflict. Watch for:

- **False synthesis** — the AI averages two conflicting answers instead of noting they conflict
- **Recency bias** — the AI weights the most recently mentioned source without saying so
- **Missing the conflict entirely** — the AI picks one source and ignores the other

If the answer seems too clean, probe it:
> "Do these two sources say the same thing, or is there a tension I should know about?"

That question alone will surface most hidden conflicts.

## Safety Check

When using multiple sources, always ask: which source did each claim come from? If you can't trace a claim back to a specific source, treat it as unverified.

## What To Remember

Name the sources, name the goal, name the format, name the boundary. Explicit beats broad every time.
