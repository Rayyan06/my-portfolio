---
layout: 'base.njk'
title: 'Home'
---

## My Projects

Here are some of the projects I've been working on.

<ul>
{%- for post in collections.post -%}
  <li>
    <a href="{{ post.url }}">
      {{ post.data.title }}
    </a>
  </li>
{%- endfor -%}
</ul>
