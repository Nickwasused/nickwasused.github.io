---
layout: post
title:  "Install Tor Snowflake on the Raspberry PI with DietPi."
date:   2022-03-12 14:24:26 +0100
categories: jekyll update tor snowflake DietPi open-source
description: "This Guide will show you how to build an run a Tor Snowflake on your Raspberry Pi 3B with DietPi."
---
## Requirements

I use a Raspberry Pi 3b with DietPi 8.2.2, which means we need to use 64Bit Packages.
I assume that you do everything in your default home folder of the root user. (That is just essential for the last step, but you will notice what you need to change if you use another folder.)

## Install GO

### Automatic

Open the diet pi software installer by typing: ```dietpi-software```.

After that, go to search and search for: ```go```.

Now select ```Go: Runtime environment and package installer```.

Reconnect to the pi and run ```go version```. This should be higher than 1.13.

### Manual

It is important that you install Go Version 13 or above.

Start by creating some directories and downloading go:
```bash
mkdir ~/src && cd ~/src
```
```bash
wget https://go.dev/dl/go1.17.8.linux-arm64.tar.gz
```

Now extract the package.
```bash
tar -C /usr/local -xzf go1.17.8.linux-arm64.tar.gz
```

After that, you can delete the downloaded archive.
```bash
rm go1.17.8.linux-arm64.tar.gz
```

The last step is to add go to your Path.
```bash
nano ~/.profile
```

Add the following in that file:
```bash
PATH=$PATH:/usr/local/go/bin
GOPATH=$HOME/go
```

You can now reload the file with:
```bash
source ~/.profile
```

Test the installation by running:
```bash
go version
```

The output should look like this:
```bash
go version go1.17.8 linux/arm64
```

## Build Tor Snowflake

First, we need to install some essentials:
```bash
apt install git
```

After that you can clone the repo:
```bash
git clone https://git.torproject.org/pluggable-transports/snowflake.git
```

Now go in the directory and start the build.
```bash
cd snowflake/proxy
go build
```

To start the snowflake make the build file executable and start it.
```bash
chmod +x ./proxy
./proxy
```

## Run Snowflake as a service

(This is the part where the installation location and User matter!)

Create a new Service file.
```bash
nano /etc/systemd/system/snowflake.service
```

Add the following to the file.
```plaintext
[Unit]
Description=Tor Snowflake Proxy
After=network.target
StartLimitIntervalSec=0

[Service]
LogLevelMax=6
Type=simple
User=root
SyslogIdentifier=snowflake
StandardOutput=syslog
StandardError=syslog
ExecStart=/root/snowflake/proxy/proxy
Restart=on-failure
WorkingDirectory=/root/snowflake/proxy/

[Install]
WantedBy=multi-user.target
```

Now let's create some logs.
```bash
nano /etc/rsyslog.d/50-default.conf
```

Add the following:
```plaintext
:programname,isequal,"snowflake"         /var/log/snowflake/snowflake.log
```

After you added the line, save the file and restart rsyslog.
```bash
systemctl restart rsyslog
```

As the last step, we set up logrotate.
```bash
nano /etc/logrotate.d/snowflake
```

With the following content:
```plaintext
/var/log/snowflake/snowflake.log { 
    su root syslog
    daily
    rotate 5
    compress
    delaycompress
    missingok
    postrotate
        systemctl restart rsyslog > /dev/null
    endscript    
}
```

## Run on startup

To run the Snowflake on system startup run:
```bash
systemctl enable snowflake
service snowflake start
```

You can now type 
```bash
tail -f /var/log/snowflake/snowflake.log
``` 
to see your snowflake in action.

## Update

Steps to update the snowflake.

Stop the proxy service:
```bash
service snowflake stop
```

Go in the snowflake directory:
```bash
cd /root/snowflake
```

Now update the code by running:
```bash
git pull
```

After that, rebuild the proxy:
```bash
cd proxy
go build
```

You can now start the snowflake service.
```bash
service snowflake start
```

# Source

### For installing GO
[https://www.jeremymorgan.com/tutorials/raspberry-pi/install-go-raspberry-pi/](https://www.jeremymorgan.com/tutorials/raspberry-pi/install-go-raspberry-pi/)

### Building Tor Snowflake
[https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/wikis/home](https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/wikis/home)

