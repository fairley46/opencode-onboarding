# Module 9: Build a Tiny Helper Tool

## Why This Matters

This module exists to lower the intimidation barrier. Many learners hear "tool" and picture a large engineering project. That is not the goal here.

## The Simple Picture

A tiny tool is often enough. If it answers one useful question from one safe source, it can already save time and teach the right habits.

## A Practical Example

There is a working example in `exercises/templates/helper-tool/policy-lookup.js`.

It does three things:
1. Reads `.md` and `.txt` files from a local folder
2. Searches for a keyword you provide
3. Returns matching lines plus the source filename

That is all. Here is the core of how it works:

```javascript
// Read files from ONE folder (no network, no subdirectories)
const files = fs.readdirSync(targetFolder).filter(f => f.endsWith(".md"));

// Search each file for the keyword
for (const filename of files) {
  const content = fs.readFileSync(filePath, "utf8");  // read-only
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.toLowerCase().includes(searchTerm)) {
      results.push({ file: filename, line: line.trim() });
    }
  }
}
```

**Why each choice matters:**
- `readFileSync` only — the tool literally cannot write or delete anything
- One folder, no subdirectories — the boundary is visible and easy to audit
- No network calls — nothing leaves the machine
- Shows source filename — makes results verifiable and citable

## What The Learner Should Notice

The value is not in writing a lot of code. The example is ~70 lines with no external dependencies. The value is in the decisions:

- **Narrow scope** — one folder, one question type
- **Read-only** — the code has no write operations; it physically cannot change anything
- **Visible boundaries** — you can read the whole tool in two minutes and audit exactly what it can access
- **Citable output** — every result shows its source, so the human can verify it

These are the same principles that apply whether you are building a tiny search script or a large enterprise integration.

## Safety Check

Start with one low-risk data source. Do not expand access just because the tool "could" do more.

## What To Remember

Small and safe beats ambitious and unclear.

