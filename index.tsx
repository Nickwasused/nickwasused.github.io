/** @jsx h */

import blog, {h} from "https://deno.land/x/blog@0.4.2/blog.tsx";

blog({
  title: "Nickwasused",
  author: "Nickwasused",
  avatar: "./source.png",
  avatarClass: "rounded-full",
  lang: "en",
  dateStyle: "long",
  links: [
    { title: "Email", url: "mailto:contact@nickwasused.com" },
    { title: "GitHub", url: "https://github.com/Nickwasused", target: "_blank" },
    { title: "Mastodon", url: "https://mastodon.social/web/@nickwasused", target: "_blank" }
  ],
  theme: "dark",
  middlewares: []
});
