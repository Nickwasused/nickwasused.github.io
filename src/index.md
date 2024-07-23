---
layout: basic.html
---
<div class="posts">
{% for post in collections.posts reversed %}
  <div class="post">
    <a href="{{ post.url }}"><h2>{{post.data.title}}</h2></a>
    <div>{{post.data.snippet}}</div>
    <div class="date">{{post.data.date | custom_date}}</div>
  </div>
{% endfor %}
</div>