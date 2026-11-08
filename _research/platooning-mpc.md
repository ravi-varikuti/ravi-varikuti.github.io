---
title: Distributed MPC for vehicle platooning
description: Comparing distributed and centralized model predictive control for cooperative cruise control, balancing vehicle spacing, smooth motion, and computation cost.
year: 2023
order: 4
poster: /assets/images/platooning-mpc/platoon.png
poster_alt: A lead vehicle coordinating a platoon of following vehicles
poster_fit: contain
paper_url: /assets/papers/AuE8930_Team5_FinalReport.pdf
venue: Clemson University · Course project
---

<div class="project-resources">
  <a href="{{ page.paper_url | relative_url }}">Read the project report (PDF) ↗</a>
  <span>{{ page.venue }}</span>
</div>

## Overview

How can a group of vehicles coordinate their speed and spacing without solving an increasingly large control problem in one place? This course project studies longitudinal vehicle platooning using cooperative adaptive cruise control (CACC), comparing centralized and distributed model predictive control in MATLAB simulations.

Both approaches predict future vehicle motion and optimize acceleration or braking while considering spacing, speed, and control effort. The key difference is where that optimization takes place and how information is shared among vehicles.

## Centralized and distributed control

**Centralized MPC** optimizes the entire platoon as one system, using the states and planned inputs of all vehicles. This allows coordinated decisions across the group, but the size of the optimization grows as vehicles are added.

**Distributed MPC** gives each vehicle a local optimization problem and exchanges information with neighboring vehicles. In the predecessor-following setup studied here, each follower coordinates with the vehicle directly ahead. This reduces the size of each local problem while maintaining coordination through communication.

<figure class="research-figure">
  <img src="{{ '/assets/images/platooning-mpc/control-architecture.png' | relative_url }}" alt="Local controllers coordinate the leader and successive follower vehicles through shared state and control information" loading="lazy">
  <figcaption>The distributed control architecture used in the report.</figcaption>
</figure>

## Simulation study

The tracking study uses one lead vehicle and three followers. The lead vehicle follows an Urban Dynamometer Driving Schedule speed profile, while the followers aim to maintain a desired 25 m inter-vehicle gap. Both controllers use a longitudinal vehicle model and a 0.1 s sampling interval.

The objective balances spacing error, speed matching, and control effort. Changing these weights reveals the trade-off between maintaining the desired gap and avoiding aggressive control inputs.

<div class="research-gallery">
  <figure class="research-figure">
    <img src="{{ '/assets/images/platooning-mpc/centralized-positions.png' | relative_url }}" alt="Simulated lead and follower positions under centralized MPC" loading="lazy">
    <figcaption>Vehicle positions with centralized MPC.</figcaption>
  </figure>
  <figure class="research-figure">
    <img src="{{ '/assets/images/platooning-mpc/distributed-positions.png' | relative_url }}" alt="Simulated lead and follower positions under distributed MPC" loading="lazy">
    <figcaption>Vehicle positions with distributed MPC.</figcaption>
  </figure>
</div>

## Performance and computation

In the reported simulations, both controllers form a platoon and regulate inter-vehicle spacing. Centralized MPC produces slightly smoother trajectories, while distributed MPC has a smaller increase in computation time as the number of vehicles grows.

**The main takeaway is a trade-off between globally coordinated control and computational scalability.** These findings come from the report's simulated vehicle models and controller settings, rather than physical vehicle experiments.

<figure class="research-figure">
  <img src="{{ '/assets/images/platooning-mpc/computation-time.png' | relative_url }}" alt="Measured simulation computation times for centralized and distributed MPC with two to ten vehicles" loading="lazy">
  <figcaption>Computation-time comparison reported for increasing platoon size.</figcaption>
</figure>

## Project report

**A Study on Distributed Model Predictive Control in Longitudinal Traffic with CACC Platooning Systems**

<strong>R. Varikuti</strong>, S. Yang, and V. Seethapathi.

Clemson University, AuE 8930 course project, 2023.

[Read the full report (PDF)]({{ page.paper_url | relative_url }})
