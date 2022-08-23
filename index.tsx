/** @jsx h */

import blog, {h} from "https://deno.land/x/blog@0.4.2/blog.tsx";

const author = "Nickwasused";

blog({
  title: author,
  author: author,
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
  middlewares: [],
  footer: <footer class="mt-5 pb-16 lt-sm:pb-8 lt-sm:mt-16"><div style="width: auto; border-bottom: 1px solid #21262d;" /><a href="https://www.abuseipdb.com/user/90646" title="AbuseIPDB is an IP address blacklist for webmasters and sysadmins to report IP addresses engaging in abusive behavior on their networks" target="_blank" referrerpolicy="no-referrer-when-downgrade" hrefLang="en" rel="external"><img src="https://www.abuseipdb.com/contributor/90646.svg" alt="AbuseIPDB Contributor Badge" style="width: auto; padding-bottom: 2.5%; padding-top: .3em;" /></a>© { new Date().getFullYear() } { author } · Powered by Deno Blog · <a href="/feed" title="Atom Feed"><svg class="inline-block w-4 h-4" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="--darkreader-inline-fill: currentColor;" data-darkreader-inline-fill=""><path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"></path><path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z"></path></svg>RSS</a></footer>
});
