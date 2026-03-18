#!/usr/bin/env node
// setup.js — One-time scaffolding for OpenCode Onboarding
// Run once: npm run setup
// Then open this folder in OpenCode to begin.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function copyIfMissing(src, dest) {
  const srcPath = path.join(ROOT, src);
  const destPath = path.join(ROOT, dest);
  if (fs.existsSync(destPath)) {
    console.log(`  already exists: ${dest}`);
    return false;
  }
  if (!fs.existsSync(srcPath)) {
    console.log(`  warning: template not found: ${src}`);
    return false;
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`  created: ${dest}`);
  return true;
}

console.log('\nOpenCode Onboarding Setup\n');

// Scaffold org config files from templates
console.log('Org config:');
copyIfMissing('org/org-context.template.md', 'org/org-context.md');
copyIfMissing('org/escalation.template.md', 'org/escalation.md');
copyIfMissing('org/approved-mcps.template.json', 'org/approved-mcps.json');

// Scaffold PROGRESS.md from template
console.log('\nProgress tracking:');
copyIfMissing('PROGRESS.md.template', 'PROGRESS.md');

console.log('\nDone.\n');
console.log('Next steps:');
console.log('  1. Edit org/org-context.md with your organization\'s policies (optional but recommended)');
console.log('  2. Edit org/escalation.md with your escalation contacts (optional but recommended)');
console.log('  3. Open this folder in OpenCode to begin the onboarding\n');
