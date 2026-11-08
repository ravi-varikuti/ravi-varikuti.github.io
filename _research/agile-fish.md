---
title: Learning to control an agile robotic fish
description: Differentiable reinforcement learning adapts PID gains for simultaneous speed and path tracking, with transfer from simulation to a physical fish-like robot.
year: 2026
order: 2
poster: /assets/images/agile-fish/tracking.png
poster_alt: Experimental fish robot paths tracing the letters I, R, O, and S
poster_fit: cover
paper_url: https://arxiv.org/abs/2607.16508
code_url: https://github.com/kloya03/agilefish-diff-rl
venue: IROS 2026
# Clips are trimmed from Downloads/output.mp4; replace these paths to update them.
clips:
  design:
    video: /assets/videos/agile-fish/robot-design.mp4
    webm: /assets/videos/agile-fish/robot-design.webm
    poster: /assets/images/agile-fish/robot-design-poster.jpg
    title: Robot design and swimming
    caption: Internal rotor actuation, the flexible tail, and examples of swimming and turning.
  validation:
    video: /assets/videos/agile-fish/model-validation.mp4
    webm: /assets/videos/agile-fish/model-validation.webm
    poster: /assets/images/agile-fish/model-validation-poster.jpg
    title: Simulation and physical model validation
    caption: Side-by-side simulated and physical motion, with comparisons of the resulting dynamics.
  learning:
    video: /assets/videos/agile-fish/gain-learning.mp4
    webm: /assets/videos/agile-fish/gain-learning.webm
    poster: /assets/images/agile-fish/gain-learning-poster.jpg
    title: Learning adaptive controller gains
    caption: The differentiable training loop and the learned policy controlling a simulated swimmer.
  tracking:
    video: /assets/videos/agile-fish/path-tracking.mp4
    webm: /assets/videos/agile-fish/path-tracking.webm
    poster: /assets/images/agile-fish/path-tracking-poster.jpg
    title: Physical path tracking
    caption: The robot follows I, R, O, and S paths at a commanded speed of 0.25 m/s. Playback speeds vary by panel, as labeled in the clip.
  speeds:
    video: /assets/videos/agile-fish/multiple-speeds.mp4
    webm: /assets/videos/agile-fish/multiple-speeds.webm
    poster: /assets/images/agile-fish/multiple-speeds-poster.jpg
    title: Tracking at different speeds
    caption: Tracking overlays compare four commanded swimming speeds on each reference path.
---

<div class="project-resources">
  <a href="{{ page.paper_url }}">Read the paper ↗</a>
  <a href="{{ page.code_url }}">Code ↗</a>
  <span>{{ page.venue }}</span>
</div>

<figure class="research-figure">
  <img src="{{ page.poster | relative_url }}" alt="Fish robot tracking I, R, O, and S paths at four commanded speeds">
  <figcaption>Physical path-tracking experiments. White, green, magenta, and orange traces correspond to commanded speeds of 0.10, 0.15, 0.20, and 0.25 m/s.</figcaption>
</figure>

## Overview

How can a fish-like robot follow a curved path while maintaining a desired swimming speed? These tasks are closely coupled: turning changes the forces acting on the body and can slow the robot down. A controller must coordinate propulsion and steering as both speed and path curvature change.

We combine a physics-based differentiable simulator with a learned policy that continually adjusts the gains of two PID controllers. One controller regulates heading through the tail rudder, while the other regulates speed through the internal rotor. The policy is trained in simulation and then deployed on the physical swimming robot.

<dl class="research-stats">
  <div><dt>25 cm</dt><dd>Robot body length</dd></div>
  <div><dt>535 g</dt><dd>Robot mass</dd></div>
  <div><dt>4 paths</dt><dd>Physical tracking tests</dd></div>
</dl>

## Robot design

The robot uses an oscillating internal balanced rotor for propulsion and a servo-actuated tail rudder for steering. The rotor's motion interacts with the surrounding water to produce forward movement, without an external propeller. Changing its oscillation amplitude and frequency regulates propulsion.

A Raspberry Pi Zero 2W runs the controller onboard. An IMU and overhead camera measurements are combined to estimate the robot's position, heading, and velocity for feedback control.

<figure class="research-figure">
  <img src="{{ '/assets/images/agile-fish/design.png' | relative_url }}" alt="Fish robot with a flexible tail, servo, batteries, onboard computer, IMU, and internal balanced rotor" loading="lazy">
  <figcaption>The modular swimming platform and its internal rotor and electronics.</figcaption>
</figure>

{% include research-video.html clip=page.clips.design %}

## A simulator that captures the essential dynamics

Detailed fluid simulation is expensive, so the training environment uses a reduced-order mechanical model based on a modified Chaplygin sleigh. It approximates the head and flexible tail dynamics, with model parameters identified from physical experiments.

The model is checked against measured swimming behavior, including forward velocity, trajectories, and the repeating oscillations produced by rotor actuation. This provides a computationally efficient basis for learning while retaining the dynamics that matter for control.

<figure class="research-figure">
  <img src="{{ '/assets/images/agile-fish/validation.png' | relative_url }}" alt="Comparisons between measured and simulated swimming dynamics, trajectories, and forward velocity" loading="lazy">
  <figcaption>Model validation against physical experiments, including oscillatory behavior and propulsion response.</figcaption>
</figure>

{% include research-video.html clip=page.clips.validation %}

## Learning adaptive PID gains

A line-of-sight planner selects a point ahead on the reference path and turns it into a desired heading. Two feedback loops then regulate heading and forward speed. Rather than keeping their PID gains fixed, a neural policy adjusts all six gains from the robot's motion and tracking errors.

**The learned policy selects controller gains; the PID controllers generate the steering and propulsion commands.** This preserves a familiar feedback structure while allowing the response to change with the task.

During training, the simulator is differentiable: the learning algorithm can trace how gain choices affect future motion and tracking error. Backpropagation through time uses this information to improve the policy over short sequences of closed-loop behavior. Training also discourages large or rapidly changing gains and abrupt speed changes.

<figure class="research-figure">
  <img src="{{ '/assets/images/agile-fish/pipeline.png' | relative_url }}" alt="Differentiable simulation and gain learning followed by deployment on a physical robotic fish" loading="lazy">
  <figcaption>Training learns adaptive PID gains in simulation; deployment uses the learned policy with sensing, state estimation, and onboard control.</figcaption>
</figure>

{% comment %}
{% include research-video.html clip=page.clips.learning %}
{% endcomment %}

## From simulation to the swimming robot

Training begins with easier paths and progresses toward tighter curves once tracking improves. Circular and sinusoidal paths, varied reference speeds, and randomized starting phases expose the policy to different control demands rather than a single memorized route.

The learned policy is then transferred to the physical platform. Experiments test paths shaped like the letters I, R, O, and S at commanded speeds from 0.10 to 0.25 m/s, assessing path following and speed regulation together.

The results also show why these objectives cannot be considered independently. At lower speeds, steering authority is reduced and stronger corrections can disrupt propulsion. The controller therefore balances lateral correction against speed tracking. The demonstrated results are for planar swimming.

{% include research-video.html clip=page.clips.tracking %}

{% include research-video.html clip=page.clips.speeds %}

<figure class="research-figure">
  <img src="{{ '/assets/images/agile-fish/speed.png' | relative_url }}" alt="Measured speed on I, R, O, and S paths compared with reference speeds from 0.10 to 0.25 meters per second" loading="lazy">
  <figcaption>Measured swimming speeds across the four paths. Dashed lines indicate the commanded speeds.</figcaption>
</figure>

## Paper and code

**Differentiable Reinforcement Learning for Path Tracking by an Agile Fish-Like Robot**

P. Chivkula\*, K. Loya\*, <strong>V. R. R. Varikuti</strong>\*, and P. Tallapragada.

\* Equal contribution.

*IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)*, 2026.

[Read the paper](https://arxiv.org/abs/2607.16508) · [Code](https://github.com/kloya03/agilefish-diff-rl)
