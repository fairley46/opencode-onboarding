# Module 15: Troubleshooting and Next Steps

## Why This Matters

Every learner hits a moment where the AI does something unexpected. A vague answer, a wrong fact, a response that misses the point entirely. What you do in that moment matters more than the mistake itself.

This module gives you a recovery framework and a clear picture of where to go next.

## When the Output Is Not What You Expected

Most problems trace back to one of five things. Work through this list before assuming the AI is broken or that you're "bad at AI."

**1. The goal was unclear.**
If your prompt didn't say what kind of output you wanted, the AI made a reasonable guess. It may have guessed wrong. Fix: restate the goal explicitly, including format and scope.

**2. The context was wrong or incomplete.**
The AI can only work with what you give it. If you asked about a document but didn't attach it, or asked about company policy without pointing to the policy file, the AI reasoned from general knowledge instead of your actual material. Fix: be explicit about which sources to use.

**3. The wrong tool was connected — or no tool was connected.**
If the task needed an approved MCP to look something up but none was connected, the AI filled in the gap with general knowledge. That general knowledge may be outdated or wrong. Fix: check what tools are connected and whether the task actually needs them.

**4. Permissions were missing.**
The AI may have hit a boundary it couldn't cross — a file it couldn't read, a tool it couldn't call — and worked around it silently rather than telling you. Fix: check what the AI actually had access to for the task.

**5. The question needed a human answer.**
Some questions are not AI questions. Anything involving your org's specific policy decisions, approval chains, compliance judgments, or business context needs a person. The AI will give you a plausible-sounding answer because that's what it does — but plausible is not the same as correct or authoritative. Fix: check `org/escalation.md` for the right contact.

## The Reset Prompt

When an answer feels off, don't just try again with the same prompt. Try this instead:

> "That answer doesn't seem right. Let me give you more context. [Add the missing source or clarification.] Given that, what's your answer now?"

This pattern — flag the problem, add context, ask again — gets better results than rephrasing the same vague prompt.

## When to Escalate

Not every problem is a prompting problem. Escalate to your admin or the contacts in `org/escalation.md` when:

- The AI gives an answer that contradicts your org's known policy
- You see the AI attempting to access something it shouldn't have access to
- A workflow produces an output you can't explain or verify
- You're being asked to approve an action you don't understand
- Something feels wrong and you can't identify why

Escalation is not failure. It's the correct response when the situation is outside your confidence level.

## Common Mistakes in the Troubleshooting Phase

**Trying the same prompt ten times.** If it didn't work the second time, it won't work the tenth time either. Change something: add context, specify the source, narrow the scope.

**Dismissing the output entirely.** Even a poor answer often contains something useful — a structure, a starting point, a question worth asking. Look for what's salvageable before discarding.

**Assuming the AI understood what you meant.** It understood what you wrote. If there's a gap between those two things, the output reflects what you wrote, not what you meant.

**Not reading the output carefully.** Skim-approving AI output is how mistakes get forwarded to colleagues and clients. If you're going to use it, read it.

## Where to Go From Here

You've completed 15 modules. Here's what that means for your day-to-day work:

**Start with low-stakes tasks.** Summarizing a long document, drafting a first version of something routine, comparing two versions of a file. Build confidence before using AI for anything that goes to clients or decision-makers.

**Use the workflows from Module 14.** The three templates there are designed for real work. Try one this week.

**Check your org's approved use cases.** `org/org-context.md` lists what's approved for your org. If something you want to do isn't on the list, ask — that's how the list grows.

**Keep the verification habit.** Trust scales with stakes, not with confidence. One check before you act is a habit worth keeping permanently.

**Ask questions.** Your facilitator (this AI, in this workspace) is still here. You can come back to ask about anything you covered, practice a workflow, or work through a real task with guidance.

## Safety Check

Finishing the program doesn't mean you know everything. It means you have the foundations to learn safely. Stay curious, stay skeptical, and keep asking whether the output actually checks out.

## What To Remember

When something goes wrong: check the goal, the context, the tools, the permissions, and whether it's actually an AI question. When something feels wrong and you can't diagnose it: escalate. And then keep going.

