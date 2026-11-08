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
# Add MP4 files to assets/videos/spinjorr/ and set each video path below.
# Example: video: /assets/videos/spinjorr/jumping.mp4
demos:
  - title: Forward jumping
    poster: /assets/images/long_jump.png
    caption: Momentum-driven jumping combines forward motion with obstacle clearance.
    video: ""
  - title: Reverse jumping
    poster: /assets/images/spinjorr/reverse-jump.png
    caption: Internal actuation also enables jumps in the reverse direction.
    video: ""
  - title: Steering
    poster: /assets/images/spinjorr/steering.jpg
    caption: A tip-mounted rotor changes the robot's heading during rolling.
    video: ""
  - title: Self-righting
    poster: /assets/images/spinjorr/self-righting.png
    caption: Gyroscopic action and ground contact help the robot recover from a fall.
    video: ""
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

Experiments demonstrate multiple motion modes on the same platform. Video clips will be added here; the images below show the corresponding experiments.

<div class="research-gallery">
  {% for demo in page.demos %}
    {% include research-demo.html demo=demo %}
  {% endfor %}
</div>

## Moving across terrain

SpinJORR was tested on surfaces including asphalt, grass, sand, gravel, tiles, and rubber mats. Rolling supports continuous travel, while jumping adds another way to negotiate uneven terrain and obstacles.

<figure class="research-figure">
  <img src="{{ '/assets/images/spinjorr/terrain.png' | relative_url }}" alt="SpinJORR rolling and jumping in indoor and outdoor terrain experiments" loading="lazy">
  <figcaption>Examples of rolling and jumping across different surfaces.</figcaption>
</figure>

## Paper

**SpinJORR: Spin Actuated Jumping Omnidirectional Rolling Robot**

<strong>V. R. R. Varikuti</strong>, A. S. Kammari, A. Mohseni, and P. Tallapragada.

*IEEE Robotics and Automation Letters*, 2026.

[Read the paper](https://doi.org/10.1109/LRA.2026.3701572)
