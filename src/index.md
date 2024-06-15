---
layout: basic.html
pagination:
  data: collections.posts
  size: 5
  reverse: true
---
<div class="posts">
{% for post in pagination.items %}
  <div class="post">
    <a href="{{ post.url }}"><h2>{{post.data.title}}</h2></a>
    <div>{{post.data.snippet}}</div>
    <div class="date">{{post.data.date | custom_date}}</div>
  </div>
{% endfor %}
</div>

<nav class="pagination">
  {% if pagination.previousPageLink %}
    <a href="{{ pagination.previousPageHref }}">Previous</a>
  {% endif %}
  {% if pagination.nextPageLink %}
    <a href="{{ pagination.nextPageHref}}">Next</a>
  {% endif %}
</nav>