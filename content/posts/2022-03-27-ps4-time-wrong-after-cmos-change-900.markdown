
---
layout: post
title:  "How to fix the PS4 Time after replacing the CMOS Battery on Firmware version 9.0?"
date:   2022-03-27 19:00:00 +0100
categories: PS4 jailbreak exploit firmware 900 9.0 CMOS time
description: "This Guide will show you how to fix the PS4 time after replacing the CMOS on firmware 9.0."
---
## The Problem

After I replaced the CMOS Battery on my Base Model PS4, I noticed that it couldn't keep the time after a power loss. The PS4 is on firmware Version 9.0 where the [CMOS Time Bomb](https://www.ps4storage.com/functional-cmos-battery-is-inevitably-required-by-ps4-and-ps5-system/) was fixed. I mean it was fixed but e.g. Grand Theft Auto V (Version 1.38) with the [No Intro](https://github.com/illusion0001/illusion0001.github.io/blob/04223072dd1ba6cb5deb4ee7953bfc2e1430745f/_patch0/orbis/GTA5-Orbis.yml) were not able to start correctly (stuck at 90% Loading and heavy flickering).

## The Fix

The fix is very simple, but a little scary to do on a Jailbroken PS4. You need to sync the time with a PSN Time Server. **This has to be done once,** after that the time will stay saved even after a power loss.

**Make sure to do at least one of the following steps before:**

- Have a Pi-hole setup on your Network and whitelist the following Domain for: ```csla.np.community.playstation.net```
- Have a payload that Blocks the Update

### Steps

1. Set up the Pi-hole to block every domain for the PS4 (You can use the Groups feature for that.)
2. Use a Payload that Blocks the Update process on the PS4
3. Connect to the Internet (preferable a LAN Cable, because you can unplug that quickly.)
4. Go to the Settings and sync the Time using "Network Time"
5. Disconnect from the Internet

After you have done that, the PS4 should keep the correct time again.

