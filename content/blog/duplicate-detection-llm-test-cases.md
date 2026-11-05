---
title: Why one similarity threshold wasn't enough to catch duplicate LLM-generated test cases
description: How I calibrated embedding-based duplicate detection for AI-generated test cases, using measured similarity scores instead of a guessed cut-off.
date: 2026-11-03
tags: [LLM, Embeddings, Testing, Ollama]
draft: true
---

> **Starter draft written from the QA Copilot case study. Read it, rewrite it in your own voice, then remove `draft: true` from the top of this file to publish it.**

When an LLM drafts test cases, it often writes the same test twice in different words. In QA Copilot, my AI-assisted testing platform, I needed to catch those duplicates without silently deleting tests that only look similar. This is how I picked the threshold, and why one number turned out not to be enough.

## The setup

QA Copilot generates test cases from user stories using a local Llama 3.1 8B model through Ollama. Before a generated test is saved, it is compared with the existing tests using embeddings from `nomic-embed-text`. Two tests with very similar embeddings are probably the same test.

The obvious approach is to pick a cut-off, say 0.85, and drop anything above it. I didn't want to guess, so I measured.

## What the scores actually looked like

I compared real pairs of tests and recorded the cosine similarity:

| Pair of tests | Similarity |
|---|---|
| Same words, reordered (a true duplicate) | 0.96 |
| A paraphrase (also a duplicate) | 0.88 |
| Related, but a different test | 0.80 |
| A different feature | 0.59 |

## Why a single threshold fails

Look at the middle two rows. A paraphrase scores 0.88 and a related-but-different test scores 0.80. They are only 0.08 apart.

- Set the cut-off at 0.90 or higher and you keep the paraphrase, so duplicates slip through.
- Set it at 0.80 or lower and you delete a legitimate, different test.

Neither mistake is acceptable in a testing tool. A missed duplicate wastes a reviewer's time. A deleted test can leave a real gap in coverage, and nobody would know.

## Two bands instead of one cut-off

I used two thresholds:

- **0.90 or higher:** drop the test. This is almost certainly a duplicate.
- **0.84 to 0.90:** keep it, but flag it for the reviewer as a possible duplicate.

The flagged band is where a human is more reliable than a number. The system never silently deletes a test it is not sure about.

## What I would check next

These numbers come from one small set of examples on one model, so I would not treat 0.90 and 0.84 as universal. If I were running this across a larger team, I would re-measure on that team's own tests, and track how often reviewers reject the flagged ones, to see if the band should move.

## Takeaway

When a decision sits on a similarity score, measure real examples first, and look at how close your "keep" and "drop" cases actually are. If they are closer than you hoped, use a band with a human in the middle rather than one hard line.
