---
title: "Block all Twitter advertising accounts from your timeline."
date: 2022-03-15
background: white
snippet: This guide allows you to block all Twitter adverting accounts that have been in your timeline.
tags: ["Twitter", "Python3"]
---
## Requirements
For following this Guide you need the following:

- [a Twitter Developer Account](https://developer.twitter.com/)
- [your Twitter Data Archive](https://twitter.com/settings/download_your_data)
- [the programm](https://github.com/Nickwasused/twitter-data-export-to-blocklist)
- [python3 and pip3](https://www.python.org/)

## Program Setup
Let's start by getting the Program set up.

First, we need to install the requirements by running 
```bash
pip3 install -r requirements.txt --user
```

After that you need to copy the ```.env.example``` file to ```.env```

Now you need to get your Twitter Developer Credential and fill them in the ```.env``` file.

```plaintext
API_KEY=""
API_SECRET=""
ACCESS_TOKEN=""
ACCESS_TOKEN_SECRET=""
```

You need to get them on the Twitter Developer Site > your App > Keys and Tokens:
{{< resize-image src="twitter-dev.webp" alt="Twitter Dev" >}}

## Twitter Data
Now get your Twitter Data Archive from [here](https://twitter.com/settings/download_your_data)

After you have requested the Archive wait for the Notification Email. (This can take hours to days!)

Unpack the archive into the folder called ```export```.

The directory structure should look like this now:
```plaintext
- export
    - assets
    - data
    - .gitkeep
    - Your archive.html
- .env
- main.py
...
```

## Get the List

Now you just need to run 
```bash
python3 main.py
```

The script will output a file called ```export.csv``` and tell you how many Advertising Accounts you have seen. For me, it was around 750 Accounts, but in this example, I will use a list of 3 Accounts.

## Block the Accounts

To Block the Accounts you need to upload the ```export.csv``` content to [pastebin](https://pastebin.com) or another site.

Paste the contents of ```export.csv``` in the input field and click ```create Paste```. 
{{< resize-image src="pastebin-paste.webp" alt="pastebin-paste" >}}

Now you are redirected to your paste. Click on ```raw``` and copy the link. 
{{< resize-image src="pastebin-raw.webp" alt="pastebin-raw" >}}

Now go to this site [https://twitter-blocklist-auth.glitch.me/](https://twitter-blocklist-auth.glitch.me/) and log in.

Now you can paste the Url you have copied before in the field and click Submit.
{{< resize-image src="glitch-setup.webp" alt="glitch-setup" >}}

After that the Page will tell you how many Accounts got blocked.
{{< resize-image src="glitch-final.webp" alt="glitch-final" >}}