---
layout: 'base.njk'
title: 'Home'
---

<!-- Hero Section -->

<div class="text-center py-16 md:py-20">
<h1 class="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
Projects
</h1>
<p class="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
A collection of my hands-on electronics projects.
</p>
</div>

<!-- Projects Section Anchor -->

<div id="projects" class="pt-16">
<h2 class="text-3xl font-bold text-slate-900 tracking-tight text-center">
Featured Projects
</h2>

<!-- Project Grid -->
<div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
    {%- for project in collections.projects | reverse -%}
        <a href="{{ project.url }}" class="block p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <h3 class="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                {{ project.data.title }}
            </h3>
            {% if project.data.description %}
                <p class="mt-3 text-slate-600 leading-relaxed">
                    {{ project.data.description }}
                </p>
            {% endif %}
            <div class="mt-6 font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                View Project &rarr;
            </div>
        </a>
    {%- endfor -%}
</div>

</div>
