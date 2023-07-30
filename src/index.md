---
layout: basic.html
pagination:
  data: collections.posts
  size: 5
  reverse: true
---
{% for post in pagination.items %}
<a href="{{ post.url }}"><h2>{{post.data.title}}</h2></a>
<span>{{post.data.snippet}}</span>
{% endfor %}

<nav class="pagination">
  {% if pagination.previousPageLink %}
    <a class="pagination__item" href="{{ pagination.previousPageHref }}">Previous</a>
  {% else %}
    <span class="pagination__item">Previous</span>
  {% endif %}
  {% if pagination.nextPageLink %}
    <a class="pagination__item" href="{{ pagination.nextPageHref}}">Next</a>
  {% else %}
    <span class="pagination__item">Next</span>
  {% endif %}
</nav>