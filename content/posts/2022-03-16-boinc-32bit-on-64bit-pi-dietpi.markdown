---
layout: post
title:  "How to install 32-bit BOINC on my 64-bit Raspberry Pi?"
date:   2022-03-16 19:00:00 +0100
categories: raspberry-pi BOINC 32-bit 64-bit aarch64 armhf
description: "This Guide will show you how to install a 32-bit BOINC version on the 64-bit raspberry-pi."
---
## Why would you do this?

- Projects like UNIVERSE@HOME have no aarch64 Tasks.
- A Raspberry Pi 3b can´t run ROSETTA@HOME because it doesn't have enough ram.
- DietPi, a popular OS for the raspberry pi, uses 64Bit.

## Requirements

- 64-bit raspberry pi e.g. DietPi

Type ```uname -a``` the output should contain the following: ```aarch64``` if there is ```armhf``` in the output then you can skip to the [Install](#Install 32-bit Boinc) section.
Example output: ```Linux raspberrypi-1 5.10.103-v8+ #1530 SMP PREEMPT Tue Mar 8 13:06:35 GMT 2022 aarch64 GNU/Linux```

## Architecture

First, we need to add the 32-bit Architecture to our system with the following command:

```sudo dpkg --add-architecture armhf```

Now you need to update the package list:

```sudo apt update```


## Remove 64-bit Boinc

To remove the 64-bit version of the Boinc-Client type:

```sudo apt remove boinc-client -y```

## Install 32-bit Boinc

If the output of ```uname -a``` is ```armhf``` then type:

```sudo apt install boinc-client```

To install the 32-bit version of the Boinc-Client type:

```sudo apt install boinc-client:armhf -y```