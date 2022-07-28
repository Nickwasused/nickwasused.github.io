import blog from "https://deno.land/x/blog@0.4.2/blog.tsx";

blog({
  title: "Nickwasused",
  author: "Nickwasused",
  avatar: "./source.png",
  avatarClass: "rounded-full",
  lang: "en",
  dateStyle: "long",
  links: [
    { title: "Email", url: "mailto:contact.nickwasused.fa6c8@simplelogin.co" },
    { title: "GitHub", url: "https://github.com/Nickwasused" },
  ],
  background: "#fff",
  middlewares: [],
});
