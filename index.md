---
layout: home
title: Home
---

<section class="hero profile" aria-labelledby="profile-name">
  <div class="profile-copy">
    <h1 id="profile-name">Ravi Varikuti</h1>
    <p class="intro">Hi! I'm a final-year Ph.D. student at Clemson University, working with <a href="https://ptallap.people.clemson.edu/index.html">Dr. Phanindra Tallapragada</a> in the <a href="https://ptallap.people.clemson.edu/index.html"><strong>DROIDS Lab</strong></a>.</p>
    <p class="intro">My research focuses on <strong>modeling and understanding the dynamics of robotic systems and developing control algorithms</strong> for agile and unconventional robots, including jumping robots, swimming robots, and tethered aerial robots. I'm interested in understanding and exploiting the underlying dynamics of these systems to develop control strategies that enable agile, efficient, and adaptive behaviors. More recently, I've also begun exploring <strong>whole body control of humanoid robots</strong>, with an emphasis on dynamics aware control using reinforcement learning.</p>
    <p class="intro">I'm passionate about building complete robotic systems from the ground up, integrating mechanical design, electronics, and control. I especially enjoy working across the entire robotics stack and bringing ideas to life on real robots.</p>
    <div class="hero-links">
      <a href="mailto:vvariku@clemson.edu">Email</a>
      <a href="https://github.com/ravi-varikuti">GitHub</a>
      <a href="#">CV</a>
    </div>
  </div>
  <img class="profile-photo" src="{{ '/my_photo.png' | relative_url }}" alt="Ravi Varikuti" width="1122" height="1402" fetchpriority="high">
</section>

<section class="section-block" id="research">
  <div class="section-heading">
    <h2>Selected research</h2>
  </div>
  <div class="research-grid">
    {% assign projects = site.research | sort: "order" %}
    {% for project in projects %}
      <article class="project-card">
        <a class="project-media{% if project.poster_fit == 'contain' %} project-media--contain{% endif %}" href="{{ project.url | relative_url }}" aria-label="Read about {{ project.title }}">
          {% if project.video %}
            <video autoplay muted loop playsinline poster="{{ project.poster | relative_url }}">
              <source src="{{ project.video | relative_url }}" type="video/mp4">
            </video>
          {% else %}
            <img src="{{ project.poster | relative_url }}" alt="{{ project.poster_alt | default: project.title | escape }}" loading="lazy">
          {% endif %}
          <span class="media-index">0{{ forloop.index }}</span>
          <span class="media-label"> ↗</span>
        </a>
        <div class="project-copy">
          <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          <p>{{ project.description }}</p>
          {% if project.venue %}<p class="project-venue">{{ project.venue }}</p>{% endif %}
          {% if project.paper_url %}<a class="project-paper" href="{{ project.paper_url }}">Paper ↗</a>{% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
</section>

