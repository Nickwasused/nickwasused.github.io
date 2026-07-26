---
layout: basic.html
---
<div class="posts">
{% for post in collections.posts reversed %}
  <div class="post">
    <a href="{{ post.url }}"><h2>{{post.data.title}}</h2></a>
    {% if post.data.outdated %}<span>⚠️ This post is outdated and may no longer be accurate.</span><br />{% endif %}
    <div>{{post.data.snippet}}</div>
    <div class="date">{{post.data.date | custom_date}}</div>
  </div>
{% endfor %}
</div>