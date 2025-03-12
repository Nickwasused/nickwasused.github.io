---
title: "Self-Host Wikipedia"
date: 2025-03-12
background: white
snippet: My method of self-hosting a copy of Wikipedia.
tags: ["wikipedia", "kiwix", "self-host"]
---
This is my method to self-hosting Wikipedia, but it's **not** a full guide!

## Kiwix

First, we need a copy of the Wikipedia `.zim` file.

Then install and setup kiwix.

I use the following systemd-service based on https://ounapuu.ee/posts/2021/12/09/self-hosting-wikipedia/:
```
[Unit]
Description=Serve all the ZIM files loaded on this server

[Service]
Restart=always
RestartSec=15
User=kiwix
ExecStart=/usr/bin/bash -c "kiwix-serve -t 2 -i 127.0.0.1 --port=8080 /dir_with_zims/*.zim"

[Install]
WantedBy=network-online.target
```

## nginx

After that, I set up nginx with the following configuration:
```
server {
        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name YOUR_DOMAIN;

        location /robots.txt {
                root /var/www/html/;
        }

        location / {
                proxy_pass http://127.0.0.1:8080;
                proxy_http_version 1.1;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-Ip $remote_addr;
                proxy_redirect off;
                proxy_intercept_errors on;
                error_page 502 503 504 = @redirect_to_wikipedia_de;
                error_page 404 = @redirect_to_wikipedia_en;
        }

        location @redirect_to_wikipedia_de {
                set $last_segment '';
                if ($request_uri ~ /([^/]+)$) {
                        set $last_segment $1;
                }
                return 302 https://de.wikipedia.org/wiki/$last_segment ;
        }
        location @redirect_to_wikipedia_en {
                set $last_segment '';
                if ($request_uri ~ /([^/]+)$) {
                        set $last_segment $1;
                }
                return 301 https://en.wikipedia.org/wiki/$last_segment ;
        }
}
```

This config tries to get a valid response from our local copy, but when an entry is missing, it will redirect to wikipedia.org.
When the local copy is offline or errors out, then it will redirect to the German version of wikipedia.org.

## Using our copy

### Kagi

With Kagi you can set up a redirect with the following regex: `^https://(.*).wikipedia.org/(.*)\/(.*)|https://YOUR_DOMAIN/wikipedia/A/$3`

Notice that the path `/wikipedia` is based on the `*zim` file name, e.g. for `/wikipedia` it needs to be `wikipedia.zim`

### redirector

You can set up the redirector extension the following way:
![redirector config](./redirector.avif "")

# security

I have blocked some cloud providers ip-ranges in a firewall.

## scraping

Additionally, I have a `robots.txt` for the bots that follow that. I use this: https://robotstxt.com/ai