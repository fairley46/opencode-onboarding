#!/usr/bin/env node
// export.js — Generate a completion report from PROGRESS.md
// Run: npm run export

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PROGRESS_PATH = path.join(ROOT, 'PROGRESS.md');

if (!fs.existsSync(PROGRESS_PATH)) {
  console.error('\nError: PROGRESS.md not found. Run npm run setup first.\n');
  process.exit(1);
}

const progress = fs.readFileSync(PROGRESS_PATH, 'utf8');
const lines = progress.split('\n');

// Parse learner name
const nameLine = lines.find(l => l.startsWith('**Learner:**'));
const name = nameLine ? nameLine.replace('**Learner:**', '').trim() : 'Unknown';

// Parse start date
const startLine = lines.find(l => l.startsWith('**Started:**'));
const started = startLine ? startLine.replace('**Started:**', '').trim() : 'Unknown';

// Parse current module
const currentLine = lines.find(l => l.startsWith('**Current module:**'));
const current = currentLine ? currentLine.replace('**Current module:**', '').trim() : 'Unknown';

// Parse completed modules
const completed = lines.filter(l => l.startsWith('- [x]')).map(l => l.replace('- [x]', '').trim());
const skipped = lines.filter(l => l.includes('skipped')).length;
const total = lines.filter(l => l.match(/^- \[[ x]\]/)).length;

// Build report
const exportDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
});

const report = [
  '='.repeat(50),
  'ONBOARDING COMPLETION REPORT',
  '='.repeat(50),
  '',
  `Learner:          ${name}`,
  `Program started:  ${started}`,
  `Report generated: ${exportDate}`,
  `Current module:   ${current}`,
  '',
  '-'.repeat(50),
  `PROGRESS: ${completed.length} of ${total} modules complete`,
  skipped > 0 ? `(${skipped} skipped)` : '',
  '-'.repeat(50),
  '',
  completed.length > 0 ? 'Completed modules:' : 'No modules completed yet.',
  ...completed.map(m => `  ✓ ${m}`),
  '',
  completed.length < total ? `Remaining: ${total - completed.length} module(s) to go.` : 'All modules complete.',
  '',
  '='.repeat(50),
].filter(l => l !== null).join('\n');

// Write to file
const filename = `onboarding-report-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
const outPath = path.join(ROOT, filename);
fs.writeFileSync(outPath, report);

console.log('\n' + report);
console.log(`\nReport saved to: ${filename}\n`);
