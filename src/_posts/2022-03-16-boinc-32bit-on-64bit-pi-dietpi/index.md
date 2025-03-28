---
title: "Install 32-bit BOINC on a 64-bit Raspberry Pi."
date: 2022-03-16
background: white
snippet: This guide helps you to install the 32-Bit BOINC version instead of the 64-Bit one.
tags: ["Raspberry Pi", "BOINC"]
---
## Why would you do this?

- Projects like UNIVERSE@HOME have no aarch64 Tasks.
- A Raspberry Pi 3b can’t run ROSETTA@HOME because it doesn't have enough RAM.
- DietPi, a popular OS for the Raspberry Pi, uses 64Bit.

## Requirements

- 64-bit Raspberry Pi, e.g., DietPi

Type:

```Shell
uname -a
``` 
The output should contain the following: ```aarch64``` if there is ```armhf``` in the output, then you can skip to the 
[Install]({{< ref "#install-32-bit-boinc" >}} "Install") section.
Example output: ```Linux raspberrypi-1 5.10.103-v8+ #1530 SMP PREEMPT Tue Mar 8 13:06:35 GMT 2022 aarch64 GNU/Linux```

## Architecture

First, we need to add the 32-bit Architecture to our system with the following command:

```Shell
sudo dpkg --add-architecture armhf
```

Now you need to update the package list:

```Shell
sudo apt update
```


## Remove 64-bit BOINC

To remove the 64-bit version of the BOINC-Client type:

```Shell
sudo apt remove boinc-client -y
```

## Install 32-bit BOINC

If the output  is, ```armhf``` then type:

```Shell
sudo apt install boinc-client
```

To install the 32-bit version of the BOINC-Client type:

```Shell
sudo apt install boinc-client:armhf -y
```