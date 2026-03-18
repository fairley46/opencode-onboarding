# Exercise 3: Connect an Approved MCP

## Learner Objective

Experience what it actually feels like to add a new capability to OpenCode — deliberately, through an approved channel — and understand exactly what changed when you did.

## Before You Start

This exercise requires an approved MCP server to be configured for your org. Check `org/approved-mcps.json` to see what's available. If the file is empty or says "placeholder," ask your admin before continuing — this exercise can't be completed without a real approved server.

## What You'll Do

Connect one approved read-only MCP server, confirm what it added, and then ask a question that uses it.

## The Task

### Part 1: Check what's already connected

Ask the AI:
> "What MCP servers or external tools are currently connected in this workspace?"

Note the answer. This is your baseline.

### Part 2: Connect the approved server

Follow the steps from Module 9 to connect the approved MCP listed in `org/approved-mcps.json`:

1. Open OpenCode Settings → MCP Servers
2. Add the server using the details in the approved list
3. Confirm it appears as connected
4. Come back here and tell the facilitator what you added

### Part 3: Confirm what changed

Ask the AI the same question from Part 1:
> "What MCP servers or external tools are currently connected now?"

Compare the answer to your baseline. The new server should appear.

### Part 4: Use it

Ask one question that requires the new connection to answer — something you couldn't have answered from local files alone. Keep it read-only and low-stakes.

> "Using [the MCP you just connected], tell me [something relevant to your work]."

## Completion Criteria

You're done when you can answer all three:
- [ ] **What server did you connect, and what does it give the AI access to?**
- [ ] **What is one thing this server can do that OpenCode couldn't do before you connected it?**
- [ ] **What is one thing this server still cannot do — a boundary it has?**

## Common Confusion

**"I don't see any approved MCPs in the org file"** — Stop here and ask your admin. Do not connect unapproved servers to get through this exercise.

**"It connected but the AI doesn't seem to use it"** — Try asking explicitly: "Use [server name] to answer this question." The AI doesn't always reach for connected tools automatically — you may need to name it.

**"I thought MCP would give it access to everything in that system"** — MCP access is scoped by how the server is configured. A read-only policy server gives read access to policies, not to everything on the platform. Ask the AI: "What specifically can you access through this connection?"

## Facilitator Note

The goal is deliberate connection, not just working connection. Ask the learner: "Could you tell what changed just by asking the AI — without looking at settings?" If not, walk them through comparing the before/after. That comparison is the lesson.
