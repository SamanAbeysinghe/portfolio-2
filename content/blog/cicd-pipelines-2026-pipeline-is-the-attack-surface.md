---
title: "CI/CD pipelines in 2026: the pipeline is now part of your attack surface"
description: What has changed in CI/CD this year (supply-chain attacks, safer GitHub Actions defaults, secret scanning, AI agents in pipelines), and what a small project should actually do about it.
date: 2026-11-04
tags: [CI/CD, GitHub Actions, DevSecOps, Vercel]
draft: true
---

> **Starter draft. The two "what happened to me" stories come from your own deployment work, so check they read right. Verify every dated claim in the "What changed" section against the linked sources (several are from secondary blogs), rewrite it in your own voice, then remove `draft: true` from the top of this file to publish it.**

A CI/CD pipeline used to be the boring part of a project: push code, something builds it, something deploys it. In 2026 it is also one of the places attackers go first, because a pipeline holds secrets and has permission to publish your software. This post covers how I met that in a small project, what has changed this year, and a short checklist for a project of my size.

## CI/CD in one paragraph

**Continuous integration (CI)** means every change is automatically built and checked (type checks, tests, linting) before it is merged. **Continuous delivery or deployment (CD)** means a passing change is automatically released. My portfolio is a Next.js site in a GitHub repository, and Vercel builds and deploys it every time I push to `main`. That is a complete, if small, CI/CD pipeline.

## Two things my pipeline caught

**1. A build that worked on my machine and failed on Vercel.** I added a blog to the site, which needed three new packages. They were in the `package.json` on my computer but not in the one in the repository, so Vercel's fresh install did not have them and the build stopped with `Module not found`. A second problem was waiting behind it: the project listed both an npm and a pnpm lockfile, so Vercel would have picked pnpm and ignored the packages in the npm lockfile.

The lesson: a pipeline builds from a clean checkout, so it finds exactly the things your machine hides, such as files you forgot to commit and mismatched lockfiles. Use **one** package manager and commit its lockfile.

**2. A push that GitHub refused.** An `.env` file containing an API key had been committed by accident, and GitHub's **push protection** blocked the push. The key never left my machine, and the fix was to remove the file from the commit and add `.env` to `.gitignore`.

The lesson: secrets belong in the host's environment variables (in Vercel's settings), never in the repository. Push protection is a good safety net, but it should not be the only thing between you and a leaked key.

## What changed in 2026

> Check the dates and numbers here against the sources below before publishing.

**The pipeline became a target.** Several write-ups describe supply-chain attacks on CI/CD this year, including a March 2026 incident where version tags of a popular GitHub Action were changed so that anyone using that tag ran attacker code. This works because a tag like `@v1` is a movable label, not a fixed version.

**GitHub tightened its defaults.** Reports on GitHub's recent changes mention safer defaults around `pull_request_target` (a trigger that has been misused in "pwn request" attacks), more control over how workflows run, and a read-only cache for untrusted triggers. GitHub's own recommendation is to pin actions to a full-length commit SHA.

**Secret scanning grew.** In March 2026 GitHub added 28 new secret detectors from 15 providers, including Vercel tokens, and turned push protection on by default for 39 detectors. That is the same feature that stopped my push.

**Long-lived credentials are on the way out.** Short-lived identity tokens (OIDC) are replacing static cloud keys, and npm trusted publishing now supports more CI providers, so a pipeline can prove who it is without storing a permanent password.

**Actions keeps adding features.** Recent updates include non-zipped artifacts, a read-only permission for Dependabot alerts, and extra context for reusable workflows. Parallel steps have been announced as planned work; I could not confirm they have shipped.

**Pricing moved.** One report says GitHub cut the price of GitHub-hosted runners by up to 39% from 1 January 2026 and added a per-minute platform charge for self-hosted runners from 1 March 2026. Check GitHub's pricing page before relying on that.

## AI agents in pipelines

AI is showing up in CI: explaining a failed build, reviewing workflow files, proposing a small fix. It also adds a new risk. An agent that reads text from an issue, a pull request or a commit message can be tricked by instructions hidden in that text (prompt injection). One reported February 2026 incident traced a compromised npm package back to a single malicious GitHub issue title.

The practical rules:

- Treat everything an AI agent reads from GitHub (titles, comments, branch names) as **untrusted input**.
- Give the agent the **least permission** it needs, ideally read-only, and never your publishing credentials.
- Keep a human review step before anything it suggests is merged or deployed.

This is the same principle I use in my own AI work: the model drafts, a person approves.

## A checklist for a small project

1. **Run checks on every pull request.** At minimum: install from the lockfile, type-check, and build.
2. **Pin third-party actions to a full commit SHA**, and let Dependabot propose updates.
3. **Set `permissions:` explicitly** and start from read-only.
4. **Keep secrets in the host's environment variables**, never in the repo, and turn on secret scanning and push protection.
5. **Avoid long-lived keys** where the platform supports OIDC.
6. **Protect `main`**: require the checks to pass before merging.
7. **Use preview deployments** (Vercel makes one per pull request) so you see a change running before it goes live.
8. **Scan your workflow files.** Static analysis tools for GitHub Actions flag unpinned actions and risky triggers.

A minimal workflow for a Next.js project looks like this (replace the placeholder with the real commit SHA of the release you trust):

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<full-commit-sha> # v4
      - uses: actions/setup-node@<full-commit-sha> # v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run build
```

Nothing in it needs a secret, which is the point: a check job should not have access to anything worth stealing.

## Takeaway

Treat the pipeline like production code. Build from a clean checkout, keep secrets out of the repo, give every step the least permission it needs, and pin what you depend on. The tools got better this year, and so did the attackers.

## Sources

- [CI/CD supply chain attacks surge in 2026 (DEV Community)](https://dev.to/x4nent/cicd-pipeline-supply-chain-attacks-surge-2026-security-response-strategy-3n44)
- [Disrupting supply chain attacks on npm and GitHub Actions (The GitHub Blog)](https://github.blog/security/supply-chain-security/disrupting-supply-chain-attacks-on-npm-and-github-actions/)
- [AI agent prompt injection: the new CI/CD supply chain threat (Cloud Security Alliance)](https://labs.cloudsecurityalliance.org/research/csa-research-note-claude-code-github-action-prompt-injection/)
- [The pipeline became the attack surface (DEV Community)](https://dev.to/kalemi/the-pipeline-became-the-attack-surface-what-the-2026-cicd-shifts-mean-for-reliability-4p13)
- [AI agents in CI/CD pipelines 2026: benefits, risks, and a safe workflow (GravityDevOps)](https://gravitydevops.com/ai-agents-cicd-pipelines-2026/)
- [GitHub Actions updates, August 2026 (GitHub changelog)](https://github.blog/changelog/2026-08-06-github-actions-early-august-2026-updates)
- [Secret scanning pattern updates, March 2026 (GitHub changelog)](https://github.blog/changelog/2026-03-10-secret-scanning-pattern-updates-march-2026/)
