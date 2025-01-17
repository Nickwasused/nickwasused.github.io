---
title: "Fix the PS4 Time after replacing the CMOS Battery on Firmware version 9.0."
date: 2022-03-27
background: white
snippet: This is a quick fix for the time problem on the PS4 after a CMOS change.
tags: ["PS4"]
---
## The Problem

After I replaced the CMOS Battery on my Base Model PS4, I noticed that it couldn't keep the time after a power loss. The PS4 is on firmware Version 9.0, where the [CMOS Time Bomb](https://web.archive.org/web/20220609110029/https://www.ps4storage.com/functional-cmos-battery-is-inevitably-required-by-ps4-and-ps5-system/) was fixed. However, despite the fix, some games like Grand Theft Auto V (Version 1.38) with the [No Intro](https://github.com/illusion0001/illusion0001.github.io/blob/04223072dd1ba6cb5deb4ee7953bfc2e1430745f/_patch0/orbis/GTA5-Orbis.yml) Patch were unable to start correctly (stuck at 90% Loading and heavy flickering).

## The Fix

The fix is basic, but a little scary to do on a Jailbroken PS4. You need to sync the time with a PSN Time Server. **This has to be done once;** after that, the time will stay saved even after a power loss. The Time Server is probably just an NTP server.

**Make sure to do at least one of the following steps before:**

- Have a Pi-hole setup on your Network and whitelist the following Domain for: ```csla.np.community.playstation.net```
- Have a payload that Blocks the Update

If you don’t know what Pi-hole is, look [here](https://pi-hole.net/).

**It is important that you have some sort of Update-block in place!**

### Steps

1. Block the Updates
2. Connect to the Internet (preferably a LAN Cable because you can unplug that quickly). 
3. Go to the Settings and sync the Time using "Network Time."
4. Disconnect from the Internet

After you have done that, the PS4 should keep the correct time again.

You need to use the network time because only this option sets the correct time in the Kernel-Clock.

### archive

The following links are archived versions, as the main ones could break.

[https://www.ps4storage.com/functional-cmos-battery-is-inevitably-required-by-ps4-and-ps5-system/](https://web.archive.org/web/20220609110029/https://www.ps4storage.com/functional-cmos-battery-is-inevitably-required-by-ps4-and-ps5-system/)  
[https://github.com/illusion0001/illusion0001.github.io/blob/04223072dd1ba6cb5deb4ee7953bfc2e1430745f/_patch0/orbis/GTA5-Orbis.yml](https://web.archive.org/web/20240519173341/https://github.com/illusion0001/illusion0001.github.io/blob/04223072dd1ba6cb5deb4ee7953bfc2e1430745f/_patch0/orbis/GTA5-Orbis.yml)  
[https://pi-hole.net/](https://web.archive.org/web/20240519173456/https://pi-hole.net/)  