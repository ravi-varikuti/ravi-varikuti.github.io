---
title: "Building robots that learn in the real world"
description: A short note on why physical learning systems need more than a good policy.
reading_time: 3
---

Robot learning looks cleanest when the learning algorithm is isolated from everything around it. On a physical system, that separation disappears. Data collection, resets, sensing, control, and safety become part of the learning problem.

## The system is the experiment

A useful real-world learning setup must keep running when an object moves unexpectedly, a camera drops a frame, or a rollout ends in an awkward state. Reliability is not support work around the research; it determines which research questions are possible.

## Learning from every interaction

Physical experience is expensive, so each interaction should do more than produce a reward. It can expose failure modes, improve the data distribution, and reveal where the system's assumptions stop holding.

## What comes next

This is a sample post. Replace it with your own writing, or duplicate this file to publish a new article.

