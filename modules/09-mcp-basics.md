# Module 6: What MCP Is and Why It Matters

## Why This Matters

Sooner or later, learners ask, "How does OpenCode actually reach the tools and data I need?" MCP is one of the core answers to that question.

## The Simple Picture

MCP is a structured connector layer. It gives OpenCode a standard way to work with approved tools and information sources.

## Visual

```text
You
 |
 v
OpenCode host
 |
 v
MCP connection
 |
 v
Approved tool or data source
```

## A Practical Example

Instead of hard-coding every integration into the AI experience, an MCP server can expose a defined set of capabilities, such as:

- read approved documentation
- retrieve internal reference data
- run a narrow helper tool

That makes the connection more understandable and governable.

## Why It Helps

For the learner, MCP means they do not need to memorize technical plumbing. They need to know:

- what the MCP is for
- what it can access
- whether it is read-only or can make changes

## Safety Check

An MCP server is not automatically trustworthy just because it exists. In enterprise use, only approved MCPs should be presented as part of the supported path.

## How to Add an MCP in OpenCode

Adding an MCP server in OpenCode takes about two minutes. Here is the typical path:

1. **Open Settings** — In OpenCode, go to Settings (usually a gear icon or the command palette).
2. **Find MCP Servers** — Look for "MCP" or "Integrations" in the settings panel.
3. **Add a server** — Click "Add MCP Server" and fill in:
   - **Name** — a label you'll recognize (e.g., "Internal Docs")
   - **Command or URL** — the connection point your IT team or admin provided
   - **Access scope** — confirm it shows read-only if that's what you expect
4. **Save and verify** — After saving, a connected server will appear in your tool list. You can usually see what capabilities it exposes by clicking on it.
5. **Check the approved list** — Before using any MCP server, confirm it is in your org's `org/approved-mcps.json`. If it isn't there, ask your IT admin before connecting.

**What to look for after connecting:**
- The server name appears in the tools panel
- The capabilities listed match what you expected
- Access type (read-only vs. read-write) matches what was approved

If something looks wrong — more access than expected, an unfamiliar server name — disconnect and check with your admin.

## What To Remember

The AI is the thinker. MCP is one way it reaches approved capabilities. Always verify a server is on your org's approved list before connecting.
