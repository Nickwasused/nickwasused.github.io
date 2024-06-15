---
title: "Archiving Discord Servers"
date: 2024-06-15
background: white
snippet: My method of archiving Discord servers.
tags: ["discord", "archive.org", "archiving"]
---

(Note: A `guild` is a Discord server.)

# Closed system

Discord is a social network that requires an account to use; additionally, an invitation to a server is required to see its messages based on a permission system.
This means no one can request all messages on Discord.
In contrast, on a forum, I could easily download a copy of all posts or make snapshots of pages with the Wayback Machine.

I cannot do this on Discord, and this is a problem!

Let's say we have an admin called `steve` with a forum called "I Love USB". Here are two scenarios:

Steve doesn't like his community anymore:

- He removes his hosted phpBB instance, then there is a good chance that a dump is on archive.org, and if not, then there would be pages saved on the Wayback Machine.
- He deletes the Discord server: There would be no copy on the Wayback Machine, as it cannot be saved by the crawler. Great, now nothing exists, except maybe a few screenshots of the server. Or not?

# Discord Chat Exporter

The [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) can export whole Discord servers with threads in `json`. These files can then be uploaded to archive.org.
With the [DiscordChatExporter-frontend](https://github.com/slatinsky/DiscordChatExporter-frontend) I can then view the server, like within the Discord client. (Loading messages takes a little longer.)
![Exported Server Example](./export.avif "")

Exported messages are split into chunks of 10000 messages because if an export fails at a large channel, I can continue from that point. But usually I try to make one continuous export.

In this example, a [server](https://archive.org/details/discord-371265202378899476-12062024) with 1.601.026 messages is shown.

One thing I do not do is export media. Exporting all messages is already taking a while. In the case of the 1.601.026 messages, it took around 13 hours.

## Self bot

The exporter is using my Discord account token. That means I use my account as a self-bot, but this is currently not a problem. I exported multiple large servers in a short time span and did not get banned yet. If I get banned, I will update the post!

# Chat Analytics and Channels

Before uploading, I run all files through [chat-analytics](https://github.com/mlomb/chat-analytics) to generate '⁣report.html'; an example is linked [here](./report.htm).
Additionally, all channels are exported to '⁣channels.txt'; this includes all, including the ones you cannot access.

# archive.org

When archiving, I had to come up with a way to identify all the items that I and others uploaded.
First, I saw that the tag `DiscordChatExporter` was used a lot, great, so I did too.
Now that everyone can simply find the items by the tag, I had to find a good way to generate the name, identifier and description.

For the identifier, I use the following [format](https://archive.org/search?query=subject%3A%22DiscordChatExporter%22&page=2&sort=-publicdate): `discord-[guild-id]-[date '+%d%m%Y')]` an example would be `discord-371265202378899476-12062024`.
The limitations of this format are that a single export would be possible daily per server, but that's more than enough for most servers.

The description has the following format:
```
This contains the Discord messages in JSON format split into chunks the size of 10000 messages.
channels.txt contains all channels present in the discord at the given date.
Analytics from https://chatanalytics.app are stored in result.html.
Messages up to [Current Date], are saved. 
```

# Putting things together

Doing the archiving steps manually is possible, but why would I do that.
I use Linux (Ubuntu 22) on [WSL](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux), with Discord Chat Exporter, Chat Analytics, the archive.org [Command-Line Interface](https://archive.org/developers/internetarchive/cli.html) and a custom-written script.

The script, named `archive.sh` has two parameters: the guild ID and the language in the three-letter format, e.g., `eng`, `ger`.
At first, the script will check if the identifier is available, then it will get the server name with the Discord Chat Exporter and generate the identifier and description. After that, all channels are saved to the `channels.txt` file.
Then the exporting begins with the following options: `exportguild -f Json --markdown false -p 10000 --include-threads All`

This will export the given server in JSON; don't process markdown, split the file at 10000 messages, and include all threads.

And this is how I archive Discord servers.

# Downsides

The major downside of this approach is that there could be a lot of duplicate data when servers are saved often, as you would export the same messages just with the new ones at the end. In the case of the example server, 13 hours + the new messages. Incremental updates with a identifier format like `discord-[guild-id]` would be great, but that would require a per-channel export and custom code.
Object metadata could then be updated afterward, like the `updated` key. Additional information that the object is dynamic could then be added to the description of each object.

Another downside is that people think their messages are "private," as they are not accessible on the internet. This is why I only archive the "public" servers, like for open-source projects or let's say from twitch streamers.

# Usage

The script is available at: [./archive.sh](./archive.sh).
You require:
- Linux (WSL is also ok.)
- node with NPM and npx
- the archive.org [Command-Line Interface](https://archive.org/developers/internetarchive/cli.html)
- this [package.json](./package.json)
- [Discord Chat Exporter](https://github.com/Tyrrrz/DiscordChatExporter)

The folder structure should look like this:
```
/any-folder
    /archive.sh
    /ia - archive.org Command-Line Interface
    /package.json
    /cli
        /extract discord chat exporter here
```

Then install chat-analytics by running: `npm install`. 
The last step is to replace `your_token` with your [Discord token](https://github.com/Tyrrrz/DiscordChatExporter/blob/master/.docs/Token-and-IDs.md).

You can now archive a server like this: 
```shell 
./archive.sh 485079746158526464 eng
```

### tags
#discord #archive.org #archiving