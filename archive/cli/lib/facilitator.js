const {
  getCurrentModule,
  loadOrgProfile,
  readProgress
} = require("./onboarding");

const TOPIC_CARDS = [
  {
    pattern: /\bagent\b|\bassistant\b/i,
    title: "Agent vs assistant",
    plain:
      "An assistant mainly answers questions. An agent can also use approved tools, inspect files, and help carry out steps within clear boundaries.",
    technical:
      "In practice, an agent is a model coupled to tools, context, and permissions. That makes governance and approval checkpoints much more important.",
    caution:
      "Even when a tool-using agent is helpful, humans still decide what should happen next."
  },
  {
    pattern: /\blocal\b|\bweb\b|\bremote\b/i,
    title: "Local vs web execution",
    plain:
      "Local means the work is happening close to your files and environment. Web or remote means some capability depends on an outside service.",
    technical:
      "The execution boundary matters because access, retention, and data handling may differ between local tooling and remote inference or APIs.",
    caution:
      "It is always worth checking what data is involved before moving between those boundaries."
  },
  {
    pattern: /\bmcp\b/i,
    title: "MCP",
    plain:
      "MCP is a structured way for OpenCode to reach approved tools and information sources.",
    technical:
      "It provides a consistent protocol for exposing tools and resources to the agent host.",
    caution:
      "Only approved MCP servers should be used in onboarding or enterprise workflows."
  },
  {
    pattern: /\bmarkdown\b|\bguidance\b|\binstruction\b/i,
    title: "Markdown guidance",
    plain:
      "Markdown files can hold reusable guidance like goals, boundaries, tone, and review rules.",
    technical:
      "They act as persistent context and instruction shaping for the facilitator or agent.",
    caution:
      "Because these files influence behavior repeatedly, they should be reviewed carefully."
  },
  {
    pattern: /\btoken\b|\bcontext window\b|\blimit\b/i,
    title: "Tokens",
    plain:
      "Tokens are the text budget the system uses to read, think through context, and respond.",
    technical:
      "Large prompts, large files, and large tool outputs all consume context window capacity and usually increase latency and cost.",
    caution:
      "Focused inputs are usually both safer and more efficient than very large dumps of text."
  },
  {
    pattern: /\bpermission\b|\bguard\s*rail\b|\bleast privilege\b|\bsecret\b/i,
    title: "Permissions and guard rails",
    plain:
      "Guard rails are the limits that keep work safe. Permissions define what the system can touch.",
    technical:
      "Least privilege, secret handling rules, and approval checkpoints reduce the blast radius of mistakes.",
    caution:
      "If something feels high-stakes or unclear, that is a good moment to involve a person."
  }
];

const INTERNAL_POLICY_PATTERN =
  /\bour\b|\bcompany\b|\binternal\b|\bpolicy\b|\bapproved\b|\ballowed\b|\bnot allowed\b|\bcontact\b|\bsecurity team\b|\bmanager\b/i;

function renderHelpText() {
  return [
    "Available commands:",
    "- help",
    "- show",
    "- status",
    "- exercise",
    "- complete",
    "- next",
    "- prev",
    "- skip",
    "- rate <1-5>",
    "- feedback <message>",
    "- export-feedback",
    "- export-diagnostics",
    "- ask <question>",
    "- quit"
  ].join("\n");
}

function renderSessionWelcome() {
  return [
    "Welcome to the OpenCode onboarding facilitator.",
    "You can move through the modules, ask questions in plain language, and leave feedback at any time.",
    "If you ask about your organization's internal policy or business rules, I'll point you to the org guidance or support path."
  ].join("\n");
}

function answerQuestion(cwd, manifest, question) {
  const progress = readProgress(cwd, manifest);
  const module = getCurrentModule(manifest, progress);
  const orgProfile = loadOrgProfile(cwd);

  if (INTERNAL_POLICY_PATTERN.test(question)) {
    return [
      "That sounds like an internal business, policy, or approval question.",
      "I can help explain the OpenCode concepts, but I should not invent your company's rules.",
      orgProfile.escalation.trim() || "Please check your organization's guidance or support contact.",
      `You're currently in: ${module.title}.`
    ].join("\n");
  }

  const topic = TOPIC_CARDS.find((card) => card.pattern.test(question));
  if (topic) {
    return [
      `${topic.title}`,
      "",
      `Plain-English answer: ${topic.plain}`,
      `Technical detail: ${topic.technical}`,
      `Governance note: ${topic.caution}`,
      "",
      `This connects back to the current module: ${module.title}.`
    ].join("\n");
  }

  return [
    "Here is the simple version:",
    "OpenCode works best when you give it a clear goal, the smallest useful amount of context, and a clear boundary for what it should and should not do.",
    "If your question is about how your company wants you to use OpenCode internally, check the org guidance or support path rather than relying on a generic answer.",
    "",
    `Current module: ${module.title}`,
    "When you're ready, we can go back to the lesson."
  ].join("\n");
}

module.exports = {
  answerQuestion,
  renderHelpText,
  renderSessionWelcome
};
