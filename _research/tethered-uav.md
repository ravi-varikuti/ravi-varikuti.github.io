---
title: Dynamics of a UAV tethered to a ground vehicle
description: Modeling how a flexible tether, winch, and moving ground vehicle shape UAV motion, from vibration amplification to passive whirling maneuvers.
year: 2026
order: 3
poster: /assets/images/tethered-uav/system.png
poster_alt: UAV connected by a flexible tether to a winch on a ground vehicle
poster_fit: contain
venue: MECC 2026 · ASME Journal of Autonomous Vehicles and Systems (accepted)
# Add a public link as paper_url when it is available.
# To add clips, put MP4 files under assets/videos/tethered-uav/ and fill in video below.
demos:
  - title: Ground-induced tether vibrations
    poster: /assets/images/tethered-uav/base-vibration.png
    caption: Simulated tether deformation and UAV motion under oscillating base motion.
    video: ""
  - title: Whirling under circular base motion
    poster: /assets/images/tethered-uav/whirling.png
    caption: Circular ground-vehicle motion induces a wider UAV orbit and altitude variation.
    video: ""
---

## Overview

A tether can supply continuous power to an aerial robot, but it also mechanically connects the aircraft to its ground platform. When the vehicle moves or the winch pays out cable, the tether bends, stretches, and vibrates. Those motions change the forces acting on the UAV and can substantially alter its trajectory.

We develop a coupled dynamic model and simulation framework for a UAV attached to a moving ground vehicle through an elastic tether and winch. The study examines how ground-induced vibrations, changing tether length, and circular vehicle trajectories influence the aerial robot's motion.

<figure class="research-figure">
  <img class="research-system-diagram" src="{{ '/assets/images/tethered-uav/system.png' | relative_url }}" alt="A UAV connected by an elastic tether to a winch mounted on a ground vehicle" loading="lazy">
  <figcaption>The coupled system includes the UAV, a flexible elastic tether, a winch, and a moving ground attachment point.</figcaption>
</figure>

## Modeling the coupled system

The tether is modeled as a distributed elastic body with its own mass and deformation, rather than as a weightless straight line. The formulation connects its motion to the UAV's position and attitude, the winch, and prescribed ground-vehicle motion. This captures how forces and motion pass between the components.

The equations follow from an extended Hamilton's principle, which accounts for the system's kinetic and potential energy and the exchange associated with tether deployment. Spatial discretization breaks the deployed tether into elements, allowing the simulation to represent changing cable shapes and vibration modes.

## Preserving the geometry during simulation

We use a **Lie group variational integrator** to advance the coupled dynamics. In plain language, the numerical method respects the mathematical structure of the mechanical model and represents the UAV's rotations directly on their natural geometry. This provides a framework for studying the coupled motion over time without replacing the flexible tether with a rigid approximation.

The paper also examines how predicted natural frequencies and mode shapes change as the tether mesh is refined. Agreement between finer discretizations helps assess whether the simulation is resolving the important tether dynamics.

<details class="research-details">
  <summary>View tether mode-shape convergence</summary>
  <figure class="research-figure">
    <img class="research-system-diagram" src="{{ '/assets/images/tethered-uav/modes.png' | relative_url }}" alt="First three normalized tether mode shapes compared across meshes of 5, 10, 15, and 20 elements" loading="lazy">
    <figcaption>Comparison of the first three tether mode shapes under spatial mesh refinement.</figcaption>
  </figure>
</details>

## When ground vibrations reach the UAV

Vertical base oscillations can excite the tether's natural modes. **The response depends on the frequency of the base motion, not just its amplitude.** Excitation near a tether mode can amplify cable deformation, tension fluctuations, and UAV position deviations.

For the configuration studied, the revised manuscript reports pronounced amplification from approximately 0.9 Hz as excitation approaches the second tether modal frequency of 1.12 Hz. These values describe this simulated configuration; changing tether length or system parameters changes the relevant dynamics.

<figure class="research-figure">
  <img src="{{ '/assets/images/tethered-uav/base-vibration.png' | relative_url }}" alt="Snapshots comparing simulated tether and UAV motion at base excitation frequencies of 0.12 and 0.9 hertz" loading="lazy">
  <figcaption>Simulated configurations at 0.12 Hz (left) and 0.9 Hz (right), illustrating the frequency-dependent tether response.</figcaption>
</figure>

## Why flexibility matters during reel-out

As the winch releases tether, the changing length and distributed cable weight affect both the tether shape and the UAV's motion. We compare a flexible model with a straight-tether approximation under the same simulated reel-out conditions.

The models predict substantially different cable shapes and final UAV positions. A straight-line approximation cannot represent the sag and deformation captured by the flexible model, making flexibility important when predicting the system's workspace and planning tether deployment.

<figure class="research-figure">
  <img src="{{ '/assets/images/tethered-uav/reel-out.png' | relative_url }}" alt="Simulated reel-out configurations comparing flexible and straight tether models at three times" loading="lazy">
  <figcaption>Reel-out snapshots at 0, 10, and 20 seconds: flexible tether (left) and straight-tether approximation (right).</figcaption>
</figure>

## Whirling driven by the ground vehicle

When the ground vehicle follows a circular path, the tether transmits that motion to the UAV. The simulations produce a whirling response: the UAV follows a wider orbit than the vehicle, with changes in altitude and relative position. These motions become more pronounced as the prescribed base speed increases.

**The lateral maneuver emerges from the coupled passive dynamics without direct lateral control commands to the UAV.** This suggests a possible role for ground-vehicle trajectories as motion primitives for repositioning the aircraft. Optimizing such trajectories and validating the behavior experimentally remain directions for future work.

<figure class="research-figure">
  <img src="{{ '/assets/images/tethered-uav/whirling.png' | relative_url }}" alt="Simulated UAV and ground-vehicle horizontal trajectories and UAV altitude at a base speed of 3 meters per second" loading="lazy">
  <figcaption>At a ground-vehicle speed of 3 m/s, the UAV's horizontal orbit (orange) extends beyond the vehicle path (blue), with accompanying altitude variation.</figcaption>
</figure>

## Simulation videos

Video clips can be added here to show the tether response and the motion induced by the ground vehicle.

<div class="research-gallery">
  {% for demo in page.demos %}
    {% include research-demo.html demo=demo %}
  {% endfor %}
</div>

## Paper

**Dynamics of a UAV tethered to a ground vehicle**

<strong>V. R. R. Varikuti</strong>, M. Schmid, and P. Tallapragada.

Accepted for publication in the *ASME Journal of Autonomous Vehicles and Systems*. Publication details and a paper link will be added when available.

This work was also presented at *MECC 2026* through a joint conference–journal submission.
