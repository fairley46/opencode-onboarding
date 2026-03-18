# Module 5: Guard Rails and Permissions

## Why This Matters

Guard rails are not there to make AI harder to use. They are there to make safe use normal and repeatable.

## The Simple Picture

Permissions define what OpenCode can access or do. Guard rails define the rules around how that access should be used. Together, they keep mistakes small and make review easier.

## A Practical Example

A healthy beginner setup might allow:

- reading approved docs
- using one read-only MCP
- saving local onboarding feedback

It should not quietly allow:

- broad access to sensitive systems
- hidden background actions
- secret handling in prompts or config files

## The Key Principle

The phrase you will hear here is least privilege. In plain language, that means: give the tool only the access it actually needs for the current job.

## Safety Check

Humans still approve meaningful actions. If a task changes data, touches sensitive systems, or could create compliance risk, review should be expected.

## What To Remember

Safe AI use is not "trust it and hope." It is "scope it, guide it, review it."

