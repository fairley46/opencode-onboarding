# Module 6: Local vs Web Execution

## Why This Matters

"Where is this actually happening?" is one of the most important questions you can ask about any AI workflow. The answer affects what data leaves your machine, what external services are involved, what your org's data policies apply to, and who is responsible if something goes wrong.

Most enterprise data incidents involving AI happen because someone didn't know — or didn't think about — what crossed a boundary.

## The Simple Picture

Local means the work happens on your machine or within your org's controlled environment. Remote or web means some part of the workflow reaches outside — to a hosted model, an external API, or a connected service.

In real use, a single workflow often crosses both:

```text
Your machine               Your org's boundary           External
-----------                -------------------           --------
Local files    --------->  Approved MCP        ------->  Hosted model
Your prompt    --------->  Network request     ------->  External API
Local config   --------->  Auth layer          ------->  Connected service
```

The boundary isn't always visible. That's why knowing the pattern matters.

## What Stays Local

These things typically stay on your machine or within your org's environment:

- Files in your workspace folder
- Your `PROGRESS.md` and local config
- Notes, drafts, and documents you haven't explicitly shared
- The local side of approved MCP connections (the client, not the server)

Local data is subject to your machine's security, your org's endpoint policies, and whatever access your workspace has configured. It does not automatically go anywhere.

## What Leaves Your Machine

These things typically cross a network boundary:

- Your prompt (what you type is sent to the model)
- Any file content you paste into a prompt or attach to a request
- Tool calls made through connected MCPs
- Responses from the model (coming back to you)

This is not inherently a problem — it's how the tool works. The question is whether the service receiving your data has the right protections in place. For your org's approved tool, the answer should be yes. For a consumer tool you use on the side, the answer may not be.

## A Practical Example

You ask OpenCode to summarize a vendor contract you have saved locally.

What happens:
1. OpenCode reads the file from your local workspace
2. The file content is included in the prompt sent to the hosted model
3. The model processes it remotely and sends back a summary
4. The summary appears in your local session

The contract text left your machine. It was processed by the model provider. If your org has negotiated data handling terms with that provider, those protections apply. If you'd done the same thing with a consumer AI tool on your personal device, those protections would not apply.

Same task. Very different data handling.

## The Questions to Ask Before Running a Workflow

Before you run any workflow that touches sensitive content, ask:

1. **What data am I sending?** Files, text, credentials, or just a general question?
2. **Where is it going?** The approved tool? An external MCP? Both?
3. **What protections apply?** Is this covered by your org's data agreement with the provider?
4. **Does my org's policy allow this?** Check `org/org-context.md` for guidance on approved uses.

You don't need to answer these every time for every query. But for anything involving client data, internal financials, or confidential documents, these questions are worth 30 seconds of thought.

## Why This Matters for Governance

Enterprise data policies are built around where data goes and who processes it. When you use an approved AI tool:

- Your org has reviewed what data leaves the environment
- The vendor has agreed to data handling terms
- There is an audit trail
- Accountability is defined

When you use an unapproved tool:

- None of those things are guaranteed
- Your org's policies may not apply
- You may be creating exposure you're not aware of

This isn't about blame. Most people who use unapproved tools aren't trying to cause problems — they're trying to get work done. But the boundary still exists, and crossing it still creates risk. Module 7 covers this in more detail.

## Safety Check

If you're not sure whether a workflow crosses a sensitive boundary, assume it does and check. It takes less time to confirm than to remediate.

## Industry Context

Where AI runs — and where data goes — is one of the most contested questions in enterprise technology right now. Several forces are reshaping it simultaneously.

**Regulation is tightening.** GDPR has required data residency controls in Europe for years. The EU AI Act is adding a new layer specifically for AI systems, including requirements around where high-risk AI can process data and what audit trails must exist. Similar legislation is moving in multiple jurisdictions. The "where does your data go" question is no longer just a security concern — it's a compliance requirement in many industries.

**On-premise AI is becoming real.** For years, "AI" meant sending data to a hosted model in someone else's cloud. That's changing. Smaller, more capable models can now run locally or within a private cloud. Enterprises with strict data handling requirements — healthcare, finance, defense — are actively deploying these. The local/web boundary is blurring as more of the stack moves in-house.

**Vendors are competing on data handling.** Enterprise AI buyers are increasingly evaluating vendors on data residency, retention policies, and processing location — not just model capability. This is shifting how AI tools are architected and marketed. Your org's approved tool was chosen partly for these reasons.

Understanding these forces helps you see why the questions in this module — what leaves your machine, who processes it, what protections apply — are not procedural checkboxes. They're at the center of how enterprises and regulators are thinking about AI right now.

## What To Remember

Every workflow has a data path. Know where your data goes before you send it.
