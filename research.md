---
layout: page
title: Research
eyebrow: Selected work
permalink: /research/
---

<p class="lead">I study how robots can acquire useful physical skills through data, interaction, and carefully designed learning systems.</p>

<div class="archive-list">
{% assign projects = site.research | sort: "order" %}
{% for project in projects %}
  <a class="archive-row" href="{{ project.url | relative_url }}">
    <span>{{ project.title }}</span>
    <span>{{ project.year }} ↗</span>
  </a>
{% endfor %}
</div>

