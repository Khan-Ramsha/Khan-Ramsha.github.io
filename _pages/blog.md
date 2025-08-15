---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
---

<div class="post">
  
  <!-- Blog Header (only shows if you have blog_name or blog_description in _config.yml) -->
  {% if site.blog_name or site.blog_description %}
  <div class="header-bar">
    {% if site.blog_name %}
      <h1>{{ site.blog_name }}</h1>
    {% endif %}
    {% if site.blog_description %}
      <h2>{{ site.blog_description }}</h2>
    {% endif %}
  </div>
  {% endif %}

  <!-- Simple post list -->
  <ul class="post-list">
    {% for post in site.posts %}
    
    <!-- Calculate read time -->
    {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% assign year = post.date | date: "%Y" %}

    <li>
      <div class="post-item">
        <h3>
          {% if post.redirect == blank %}
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          {% elsif post.redirect contains '://' %}
            <a class="post-title" href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
            <svg width="1.2rem" height="1.2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="margin-left: 4px;">
              <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" stroke="#999" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          {% else %}
            <a class="post-title" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
          {% endif %}
        </h3>
        
        {% if post.description %}
        <p class="post-description">{{ post.description }}</p>
        {% endif %}
        
        <p class="post-meta">
          {{ post.date | date: '%B %d, %Y' }} &nbsp; &middot; &nbsp; {{ read_time }} min read
          {% if post.external_source %}
          &nbsp; &middot; &nbsp; {{ post.external_source }}
          {% endif %}
        </p>

        <!-- Simple tags and categories (only show if they exist) -->
        {% if post.tags.size > 0 or post.categories.size > 0 %}
        <p class="post-tags">
          {% for tag in post.tags %}
            <span class="tag">#{{ tag }}</span>
          {% endfor %}
          {% for category in post.categories %}
            <span class="category">{{ category }}</span>
          {% endfor %}
        </p>
        {% endif %}
      </div>
    </li>

    {% endfor %}
  </ul>

  <!-- Message when no posts exist -->
  {% if site.posts.size == 0 %}
  <div class="no-posts">
    <p>No blog posts yet. Check back soon!</p>
  </div>
  {% endif %}

</div>