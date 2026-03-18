# Organization Context
# EXAMPLE FILE — fictional org "Meridian Analytics" — do not use as-is

---

## Approved Use

The following use cases are approved for all employees using the Meridian AI Program (powered by OpenCode):

**Document work**
- Summarizing internal reports, meeting notes, and research documents
- Drafting first versions of internal communications, proposals, and documentation
- Comparing two versions of a document or policy and identifying differences
- Explaining complex documents in plain language for internal use

**Research and analysis**
- Summarizing publicly available research, articles, and vendor documentation
- Answering factual questions using content you provide in the prompt
- Helping structure analysis frameworks and decision criteria

**Code and technical work (Engineering and Data teams only)**
- Writing, reviewing, and explaining code in approved repositories
- Debugging and test writing with human review before merge
- Generating boilerplate with human review

**Communication**
- Drafting emails, Slack messages, and meeting agendas for human review
- Preparing talking points and presentation outlines

---

## Disallowed Use

The following uses are not approved at Meridian. If you are unsure, check with your manager or the AI program team before proceeding.

**Never use the AI tool for:**
- Any prompt containing client PII, account numbers, or personally identifiable data
- Unreleased financial results, earnings forecasts, or M&A-related information
- Legal documents under privilege or subject to confidentiality obligations
- Anything marked Confidential, Restricted, or under NDA without explicit approval from Legal
- Strategic plans, pricing models, or competitive intelligence not yet made public
- Generating content intended to deceive or misrepresent Meridian's position

**Do not use personal AI accounts for work tasks.** Using your personal Claude, ChatGPT, or other consumer AI account for Meridian work is not approved regardless of the task. Only the Meridian-provisioned OpenCode environment is covered by our data agreements.

---

## Internal Escalation

For AI-related questions, contact the AI Program team at **ai-program@meridian.example.com**.

For data handling questions, contact **privacy@meridian.example.com**.

For security concerns, contact **security@meridian.example.com** or use the internal security hotline.

Full escalation paths are in `org/escalation.md`.

---

## Internal Guidance Notes

**Data classification:** Meridian uses four data classifications — Public, Internal, Confidential, and Restricted. Only Public and Internal data may be used in AI prompts without explicit approval. When in doubt, treat it as Confidential.

**Client data:** No client data of any kind goes into an AI prompt. This includes client names in context (even anonymized descriptions that could identify a client). If your task requires working with client data, contact the AI program team for guidance on approved workflows.

**Review before sending:** All AI-generated content that leaves Meridian (client communications, external reports, public posts) must be reviewed and approved by a human before sending. AI output is a draft, not a final product.

**MCP connections:** Only MCP servers listed in `org/approved-mcps.json` are approved. Do not connect to additional MCP servers without approval from the AI program team. New MCP requests can be submitted at **ai-program@meridian.example.com**.

**Model training:** Meridian's enterprise agreement with Anthropic includes a data processing agreement that prohibits use of Meridian prompts for model training. This protection only applies when accessing the tool through your Meridian SSO credentials — not through personal accounts.
