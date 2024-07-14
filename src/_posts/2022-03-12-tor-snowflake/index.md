---
title: "Install Tor Snowflake on the Raspberry Pi with DietPi."
date: 2022-03-12
snippet: This is a guide for installing a tor snowflake on your Raspberry Pi as systemd service.
tags: ["Raspberry Pi", "Tor"]
---
# Notice 2

I got made aware that this setup is now deprecated. You can simply follow these instructions here: [https://community.torproject.org/de/relay/setup/snowflake/standalone/debian/](https://community.torproject.org/de/relay/setup/snowflake/standalone/debian/). (Debian 12 - bookworm is required!)

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

## Notice

**This guide has been overhauled.** See [here](/_posts/2023-04-01-tor-snowflake-v2/).

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
```Shell
mkdir ~/src && cd ~/src
```
```Shell
wget https://go.dev/dl/go1.17.8.linux-arm64.tar.gz
```

Now extract the package.
```Shell
tar -C /usr/local -xzf go1.17.8.linux-arm64.tar.gz
```

After that, you can delete the downloaded archive.
```Shell
rm go1.17.8.linux-arm64.tar.gz
```

The last step is to add go to your Path.
```Shell
nano ~/.profile
```

Add the following in that file:
```Shell
PATH=$PATH:/usr/local/go/bin
GOPATH=$HOME/go
```

You can now reload the file with:
```Shell
source ~/.profile
```

Test the installation by running:
```Shell
go version
```

The output should look like this:
```Shell
go version go1.17.8 linux/arm64
```

## Build Tor Snowflake

First, we need to install some essentials:
```Shell
apt install git
```

After that you can clone the repo:
```Shell
git clone https://git.torproject.org/pluggable-transports/snowflake.git
```

Now go in the directory and start the build.
```Shell
cd snowflake/proxy
go build
```

To start the snowflake make the build file executable and start it.
```Shell
chmod +x ./proxy
./proxy
```

## Run Snowflake as a service

(This is the part where the installation location and User matter!)

Create a new Service file.
```Shell
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
ExecStart=/root/snowflake/proxy/proxy -summary-interval 10m
Restart=on-failure
RestartSec=120
TimeoutSec=300
PrivateTmp=true
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=false
ReadOnlyDirectories=/
ReadWriteDirectories=/root/snowflake/

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

### archive

The following links are archived versions, as the main ones could break.

[https://go.dev/dl/go1.17.8.linux-arm64.tar.gz](https://web.archive.org/web/20240509215400/https://dl.google.com/go/go1.17.8.linux-arm64.tar.gz)  
[https://www.jeremymorgan.com/tutorials/raspberry-pi/install-go-raspberry-pi/](https://web.archive.org/web/20220505171516/https://www.jeremymorgan.com/tutorials/raspberry-pi/install-go-raspberry-pi/)  
[https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/wikis/home](https://web.archive.org/web/20220324185808/https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/wikis/home)  
