---
layout: home
title: Home
---

<section class="hero">
  <p class="eyebrow">Robotics researcher</p>
  <h1>Ravi Varikuti works on robots that learn from the physical world.</h1>
  <div class="hero-grid">
    <p class="intro">I am interested in robot learning, manipulation, and the systems that make learning on real hardware reliable. My work explores how robots can turn experience into useful behavior.</p>
    <div class="hero-links">
      <a href="mailto:ravi@example.com">Email</a>
      <a href="https://github.com/ravivarikuti">GitHub</a>
      <a href="#">CV</a>
    </div>
  </div>
</section>

<section class="section-block" id="research">
  <div class="section-heading">
    <p class="eyebrow">Selected research</p>
    <h2>Learning through interaction.</h2>
  </div>
  <div class="research-grid">
    {% assign projects = site.research | sort: "order" %}
    {% for project in projects %}
      <article class="project-card">
        <a class="project-media" href="{{ project.url | relative_url }}" aria-label="Read about {{ project.title }}">
          {% if project.video %}
            <video autoplay muted loop playsinline poster="{{ project.poster | relative_url }}">
              <source src="{{ project.video | relative_url }}" type="video/mp4">
            </video>
          {% else %}
            <img src="{{ project.poster | relative_url }}" alt="Abstract black-and-white placeholder for {{ project.title }}">
          {% endif %}
          <span class="media-index">0{{ forloop.index }}</span>
          <span class="media-label">View project ↗</span>
        </a>
        <div class="project-copy">
          <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
          <p>{{ project.description }}</p>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="section-block writing-preview">
  <div class="section-heading">
    <p class="eyebrow">Writing</p>
    <h2>Notes from the lab.</h2>
  </div>
  <div class="post-list">
    {% for post in site.posts limit:3 %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <span class="post-date">{{ post.date | date: "%Y.%m.%d" }}</span>
        <span class="post-title">{{ post.title }}</span>
        <span class="post-arrow">↗</span>
      </a>
    {% endfor %}
  </div>
  <a class="text-link" href="{{ '/writing/' | relative_url }}">All writing →</a>
</section>

