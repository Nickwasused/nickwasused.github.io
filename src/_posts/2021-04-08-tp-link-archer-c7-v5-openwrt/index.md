---
title: "Install OpenWrt on the TP-Link Archer C7 V5."
date: 2021-04-08
background: white
snippet: This guide is outdated.
tags: ["OpenWrt", "TP-Link Archer C7 V5"]
---
# Disclaimer

This guide is a little outdated; you should use OpenWrt version 21. I have created an updated Guide [here](/2022/03/12/tp-link-archer-c7-v5-openwrt).

# The Technical Details
[Tech data: TP-Link Archer C7 AC1750 v5](https://openwrt.org/toh/hwdata/tp-link/tp-link_archer_c7_v5)

(If you don’t want to read all of this, in short, it means that the Router should have enough power to run current OpenWrt versions.)

# The Problem with the Versions

The Archer C7 is supported by two major versions of OpenWrt: Version 18 and 19. But in the Forum for the Archer C7 are some threads that point out issues with the latest release. So I am going to use the Router with Version 18 because it seems more stable.

![Forum](./forum.webp "")

# The right Firmware Image

When installing OpenWrt for the first time, you search for a Firmware image that looks like that:

```plaintext
    openwrt-19.07.7-ath79-generic-tplink_archer-c7-v5-squashfs-factory.bin
```

The place to search for the right Firmware is on the OpenWrt page of the router, but because I don’t want the latest version, I need to search on the Download Server:

Version 19: [https://downloads.openwrt.org/releases/19.07.7/targets/ath79/generic/](https://downloads.openwrt.org/releases/19.07.7/targets/ath79/generic/)

Version 18: [https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/](https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/)

Version 18 alternative:

[https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/](https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/)

The Latest Version I have found was: [https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/openwrt-18.06.9-ar71xx-generic-archer-c7-v5-squashfs-factory.bin](https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/openwrt-18.06.9-ar71xx-generic-archer-c7-v5-squashfs-factory.bin)

After you have the right image, you need to rename it to:

```firmware.bin```

# Flashing the Firmware (Web Interface Method)

I am going to use the Web interface method because it is stable enough on my Stock firmware version.

Connect to the Router via Wi-Fi and set up a Password. After that, you can connect with an Ethernet Cable and log in. (The Stock Web interface is located here: ```192.168.0.1```)

(The Images Below are from the [TP-Link Emulator.](https://emulator.tp-link.com/archer-c7-v5/index.html))

You just need to go to Advanced > System Tools > Firmware Upgrade
Step 1: 
![Step 1](./step1.webp "")

Step 2: 
![Step 2](./step2.webp "")

Then select the firmware.bin and click on upgrade. This process can take up to 5 Minutes.
Steps 3, 4 and 5: 
![Step 3, 4 and 5](./step3.webp "")

After that, you just need to go to, ```http://192.168.1.1``` and there is the Web interface.
The OpenWrt Web interface LuCI: 

![Web interface](./interface.webp "")

### archive

The following links are archived versions, as the main ones could break.

[https://openwrt.org/toh/hwdata/tp-link/tp-link_archer_c7_v5](https://web.archive.org/web/20220609111144/https://openwrt.org/toh/hwdata/tp-link/tp-link_archer_c7_v5)  
[https://downloads.openwrt.org/releases/19.07.7/targets/ath79/generic/](https://web.archive.org/web/20210322034837/https://downloads.openwrt.org/releases/19.07.7/targets/ath79/generic/)  
[https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/](https://web.archive.org/web/20240309142808/https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/)  
[https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/openwrt-18.06.9-ar71xx-generic-archer-c7-v5-squashfs-factory.bin](https://web.archive.org/web/20220619161640/https://downloads.openwrt.org/releases/18.06.9/targets/ar71xx/generic/openwrt-18.06.9-ar71xx-generic-archer-c7-v5-squashfs-factory.bin)  
[https://emulator.tp-link.com/archer-c7-v5/index.html](https://web.archive.org/web/20220609111427/https://emulator.tp-link.com/archer-c7-v5/index.html)  