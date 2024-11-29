---
title: "Disabling the Ethernet LED on the Raspberry Pi 3B 1.2"
date: 2023-02-17
background: white
snippet: This Guide will show you how to disable the Ethernet LEDs on the Raspberry Pi 3b+.
tags: ["Raspberry Pi", "Ethernet", "Led", "Power Saving"]
---


# Notice

This is essentially a copy of this Stack Exchange post: [https://raspberrypi.stackexchange.com/questions/117632/turn-off-external-leds-on-raspberry-pi-3/130495#130495](https://raspberrypi.stackexchange.com/questions/117632/turn-off-external-leds-on-raspberry-pi-3/130495#130495)

# Post

At first, check if you have the correct Model of the Raspberry Pi 3b:

`cat /sys/firmware/devicetree/base/model`

The output should be: `# Raspberry Pi 3 Model B Rev 1.2`

Now, you need to install `libusb-1.0-0-dev`, `make`, `build-essential` and `gcc`:

`sudo apt install libusb-1.0-0-dev make gcc build-essential -y`

After that, you clone this repository: [https://github.com/dumpsite/lan951x-led-ctl](https://github.com/dumpsite/lan951x-led-ctl)

`git clone git@github.com:dumpsite/lan951x-led-ctl.git`

Now build the project:

`cd lan951x-led-ctl && make && sudo chmod +x ./lan951x-led-ctl`

# Disable the LEDs

The following command will disable both Ethernet LEDs.

`sudo ./lan951x-led-ctl --fdx=0 --lnk=0 --spd=0`

You need to apply this on every restart!

### archive

The following links are archived versions, as the main ones could break.

[https://raspberrypi.stackexchange.com/questions/117632/turn-off-external-leds-on-raspberry-pi-3/130495#130495](https://web.archive.org/web/20230401143350/https://raspberrypi.stackexchange.com/questions/117632/turn-off-external-leds-on-raspberry-pi-3/130495)  
[https://github.com/dumpsite/lan951x-led-ctl](https://web.archive.org/web/20240519172626/https://github.com/dumpsite/lan951x-led-ctl)  