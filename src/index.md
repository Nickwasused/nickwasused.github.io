---
layout: basic.html
pagination:
  data: collections.posts
  size: 5
  reverse: true
---
<div class="posts">
{% for post in pagination.items %}
  <span>
    <a href="{{ post.url }}"><h2>{{post.data.title}}</h2></a>
    <span>{{post.data.snippet}}</span>
  </span>
{% endfor %}
</div>

<nav class="pagination">
  {% if pagination.previousPageLink %}
    <a href="{{ pagination.previousPageHref }}">Previous</a>
  {% else %}
    <span>Previous</span>
  {% endif %}
  {% if pagination.nextPageLink %}
    <a href="{{ pagination.nextPageHref}}">Next</a>
  {% else %}
    <span>Next</span>
  {% endif %}
</nav>