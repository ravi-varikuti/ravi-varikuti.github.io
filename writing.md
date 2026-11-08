---
layout: page
title: Writing
eyebrow: Notes and essays
permalink: /writing/
---

<p class="lead">Ideas, experiments, and practical notes about robot learning and research.</p>

<div class="archive-list">
{% for post in site.posts %}
  <a class="archive-row" href="{{ post.url | relative_url }}">
    <span>{{ post.title }}</span>
    <span>{{ post.date | date: "%Y.%m.%d" }}</span>
  </a>
{% endfor %}
</div>

