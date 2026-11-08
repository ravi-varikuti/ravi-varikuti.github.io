---
title: SpinJORR
description: A compact robot that rolls, steers, jumps, and self-rights using internal rotors and momentum-based actuation.
year: 2026
order: 1
poster: /assets/images/long_jump.png
poster_alt: Sequence of SpinJORR performing a long jump
poster_fit: cover
paper_url: https://doi.org/10.1109/LRA.2026.3701572
venue: IEEE Robotics and Automation Letters, 2026
simulation_video: /assets/videos/jumping_sim.mp4
simulation_poster: /assets/images/spinjorr/jumping-sim-poster.jpg
# Behavior clips extracted from Downloads/hoop_small.mp4.
demos:
  - title: Forward jumping
    poster: /assets/images/spinjorr/forward-jumping-poster.jpg
    caption: Forward jumps with the height and distance annotations from the original video.
    video: /assets/videos/spinjorr/forward-jumping.mp4
    webm: /assets/videos/spinjorr/forward-jumping.webm
  - title: Reverse jumping
    poster: /assets/images/spinjorr/reverse-jumping-poster.jpg
    caption: Internal actuation launches the robot in the reverse direction.
    video: /assets/videos/spinjorr/reverse-jumping.mp4
    webm: /assets/videos/spinjorr/reverse-jumping.webm
  - title: Steering
    poster: /assets/images/spinjorr/steering-poster.jpg
    caption: The robot changes heading and maneuvers around obstacles while rolling.
    video: /assets/videos/spinjorr/steering.mp4
    webm: /assets/videos/spinjorr/steering.webm
  - title: Self-righting
    poster: /assets/images/spinjorr/self-righting-poster.jpg
    caption: Recovery from a fall using internal actuation, including a slow-motion replay.
    video: /assets/videos/spinjorr/self-righting.mp4
    webm: /assets/videos/spinjorr/self-righting.webm
recovery_demo:
  title: Recovery after landing
  poster: /assets/images/spinjorr/jump-recovery-poster.jpg
  caption: A complete sequence from takeoff and landing to self-righting and resumed rolling.
  video: /assets/videos/spinjorr/jump-recovery.mp4
  webm: /assets/videos/spinjorr/jump-recovery.webm
terrain_demo:
  title: Mobility across terrain
  poster: /assets/images/spinjorr/terrain-poster.jpg
  caption: Rolling and jumping on outdoor surfaces, shown in the original split-screen footage.
  video: /assets/videos/spinjorr/terrain.mp4
  webm: /assets/videos/spinjorr/terrain.webm
---

<div class="project-resources">
  <a href="{{ page.paper_url }}">Read the paper ↗</a>
  <span>{{ page.venue }}</span>
</div>

<figure class="research-figure">
  <img src="{{ page.poster | relative_url }}" alt="Sequence of SpinJORR performing a long jump">
  <figcaption>SpinJORR uses internal actuation to transition from rolling to jumping.</figcaption>
</figure>

## Overview

Can a robot jump without legs or springs? SpinJORR combines efficient rolling with agile jumping by exploiting the dynamics of an internal pendulum and rotor. Its compact, 3D-printed body can steer, jump forward and backward, and recover after a fall.

Our work connects robot design, dynamic modeling, and physical experiments to show how momentum-based actuation can produce versatile locomotion without elastic energy storage.

<dl class="research-stats">
  <div><dt>0.9 m</dt><dd>Forward jump height</dd></div>
  <div><dt>1.8 m</dt><dd>Forward jump distance</dd></div>
  <div><dt>800 g</dt><dd>Robot mass</dd></div>
</dl>

## Robot design

A circular hoop encloses a pendulum-like unbalanced rotor, with a second rotor mounted at its tip. Controlled internal motion drives rolling and jumping, while the tip-mounted rotor enables steering and helps the robot self-right. Dynamic models describe rolling, takeoff, flight, and ground impact.

<div class="research-gallery">
  <figure class="research-figure">
    <img class="research-image--contain" src="{{ '/assets/images/spinjorr.png' | relative_url }}" alt="Internal components of the assembled SpinJORR robot" loading="lazy">
    <figcaption>The assembled robot, with its actuation and electronics enclosed by the hoop.</figcaption>
  </figure>
  <figure class="research-figure">
    <img class="research-image--contain" src="{{ '/assets/images/spinjorr/design.png' | relative_url }}" alt="Exploded CAD view of the hoop, pendulum, motors, batteries, electronics, and cover" loading="lazy">
    <figcaption>Exploded view of the mechanical design and internal components.</figcaption>
  </figure>
</div>

## Jumping simulation

The simulation shows how internal pendulum motion first initiates rolling and then drives takeoff. As the pendulum swings upward, its motion reduces the supporting force between the hoop and the ground. **A jump begins when this ground support falls to zero while the robot's center of mass is moving upward.** Losing ground support alone is not enough: the robot must also have upward motion at that instant.

In the planar model, these conditions can occur as the pendulum swings through the upper half of its rotation, moving from horizontal toward the upright position. Its speed and acceleration must be sufficient to unload the ground contact at the right point in the swing. This makes the timing of the internal motion central to producing a jump, without storing and releasing energy in a spring. As the supporting force diminishes, the available friction also decreases, so the hoop can slip just before takeoff.

Once airborne, the robot's center of mass follows a parabolic trajectory under gravity. The hoop continues rotating around the moving center of mass, producing the cycloidal wheel-center path shown in the simulation. The distinction between these two paths helps explain how internal motion and body rotation shape the robot's visible jumping motion.

<figure class="research-figure">
  <video class="research-video-wide" autoplay muted loop playsinline preload="metadata" width="1280" height="334" poster="{{ page.simulation_poster | relative_url }}" aria-label="SpinJORR jumping dynamics simulation">
    <source src="{{ '/assets/videos/jumping_sim.webm' | relative_url }}" type="video/webm">
    <source src="{{ page.simulation_video | relative_url }}" type="video/mp4">
    Your browser does not support embedded video. <a href="{{ page.simulation_video | relative_url }}">Download the simulation video</a>.
  </video>
  <figcaption>Simulated rolling, swing-up, and jumping, with center-of-mass and wheel-center trajectories.</figcaption>
</figure>

## Motion demonstrations

The same internal actuation system produces forward and reverse jumps, steering, and self-righting. These clips show each behavior on the physical robot.

<div class="research-gallery">
  {% for demo in page.demos %}
    {% include research-video.html clip=demo %}
  {% endfor %}
</div>

## Recovery after landing

The robot can fall onto its side after a jump and then use its internal actuation to return upright. The complete sequence below connects jumping, landing, self-righting, and resumed rolling on the same platform.

{% include research-video.html clip=page.recovery_demo %}

## Moving across terrain

SpinJORR was tested on surfaces including asphalt, grass, sand, gravel, tiles, and rubber mats. Rolling supports continuous travel, while jumping adds another way to negotiate uneven terrain and obstacles.

{% include research-video.html clip=page.terrain_demo %}

<figure class="research-figure">
  <img src="{{ '/assets/images/spinjorr/terrain.png' | relative_url }}" alt="SpinJORR rolling and jumping in indoor and outdoor terrain experiments" loading="lazy">
  <figcaption>Examples of rolling and jumping across different surfaces.</figcaption>
</figure>

## Paper

**SpinJORR: Spin Actuated Jumping Omnidirectional Rolling Robot**

<strong>V. R. R. Varikuti</strong>, A. S. Kammari, A. Mohseni, and P. Tallapragada.

*IEEE Robotics and Automation Letters*, 2026.

[Read the paper](https://doi.org/10.1109/LRA.2026.3701572)
