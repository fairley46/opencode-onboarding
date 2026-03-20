# Module 14: First Useful Workflows

## Why This Matters

Confidence grows faster when you leave with something you can use tomorrow, not just a concept you understood today. This module gives you three concrete workflows — with actual prompts you can copy, adapt, and try.

## Before You Start: The Four-Part Prompt

Every good AI prompt has four elements. You don't need all four every time, but knowing them makes it easier to diagnose why a prompt isn't working.

1. **Goal** — what you want the output to be
2. **Source** — what material the AI should use
3. **Format** — how you want the answer structured
4. **Review boundary** — what the AI should not decide for you

You'll see this pattern in all three workflows below.

---

## Workflow 1: Plain-Language Summary

**When to use:** You need to understand a long document quickly — a policy, a report, a contract section — before a meeting or a decision.

**Prompt template:**

> "Read [document name or pasted content].
> Summarize it in plain language for someone who hasn't read it.
> Focus on: what it requires, what it prohibits, and what it leaves unclear.
> Keep it under 200 words.
> Do not make recommendations — I will decide what to do with it."

**What to check:** Read the first and last sections of the source document and compare them to the summary. If those match, the summary is likely reliable.

**Common mistake:** "Summarize this" produces a general summary. "Focus on what it requires and prohibits" produces a useful one.

---

## Workflow 2: Side-by-Side Comparison

**When to use:** You have two versions of something — two policy drafts, two proposals, two contracts — and you need to understand what changed or how they differ.

**Prompt template:**

> "I'm going to give you two documents. Compare them and tell me:
> 1. What is in Document A but not Document B?
> 2. What is in Document B but not Document A?
> 3. What changed in meaning, even if the words are similar?
> List each difference with a one-sentence explanation of why it matters.
> Do not recommend which is better — I'll make that call.
>
> Document A: [paste or reference]
> Document B: [paste or reference]"

**What to check:** Pick two specific differences the AI identified and verify them against the source. Two minutes of checking tells you whether the comparison is reliable.

**Common mistake:** Asking "what's different?" produces a shallow answer. Asking for three specific categories produces a structured, checkable one.

---

## Workflow 3: First Draft for Human Review

**When to use:** You need to produce a written output — an email, a briefing note, a meeting summary — and you want a solid first draft to react to rather than starting from blank.

**Prompt template:**

> "Draft a [email / briefing note / meeting summary] for [audience].
> The purpose is: [one sentence].
> Key points to include: [bullet list].
> Tone: [formal / plain / direct].
> Length: [one paragraph / one page / under 300 words].
> This is a first draft for my review — flag anything you're uncertain about."

**What to check:** Read it as if you received it. AI drafts frequently get structure right but miss nuance, overstate confidence, or use generic language where specific language is needed. Edit accordingly.

**Common mistake:** Treating the draft as final. It isn't. It's a starting point. Your job is to make it yours.

---

## Prompting Is a Conversation, Not a One-Shot

The most common mistake with prompting is treating it as a single attempt. You write something, it does not quite work, you conclude the tool is not useful. That is not what is happening.

Prompting works best when you treat it like refining a brief with a colleague. Your first prompt is a starting point. The response tells you what the AI understood — and what it missed. Your next prompt closes that gap.

**How to iterate:**

1. **Start with your best attempt** — use the four-part structure: goal, source, format, review boundary
2. **Read what comes back** — not just for quality, but for what the AI understood your request to be
3. **Name what is off** — "That is close, but the tone is too formal" or "You missed the constraint about keeping it under 200 words"
4. **Build on the conversation** — you do not need to rewrite from scratch. "Take your last response and..." is a valid prompt
5. **Push back when something is wrong** — say so directly. "I do not think that is right — what is your reasoning?" A capable model will re-examine its answer

**A practical example:**

> First prompt: "Summarize this contract for me."
> Response: too long, too general.
>
> Second prompt: "That is more detail than I need. Give me the three things I would want to know before signing — nothing else."
> Response: much better.
>
> Third prompt: "Good. Now rewrite the second point — it sounds like legal language. Plain English, two sentences."
> Response: exactly right.

Three exchanges. Three minutes. A better result than a perfect one-shot prompt would have taken to write.

The shift in mindset: you are not trying to write the perfect prompt upfront. You are having a conversation where each exchange is more informed than the last. The AI is a collaborator in developing the output — not a machine waiting for a perfect instruction.

---

## Choosing Your First Win

Pick the workflow most relevant to something on your plate this week. Use it once on a real task. Notice:
- Did the output need editing? (It will — that's normal.)
- Did it save time compared to doing it without AI?
- Was there anything in the output you would not have caught if you had not read it carefully?

That last question is the most important one to answer before you make these habits automatic.

## What To Remember

A good prompt has a goal, a source, a format, and a review boundary. Concrete beats vague, every time. And when a prompt does not land — iterate. The conversation is the tool.
