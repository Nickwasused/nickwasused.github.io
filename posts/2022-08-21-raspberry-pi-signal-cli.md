---
title: "Installing the signal-cli on the Raspberry Pi."
publish_date: 2022-08-21
background: white
snippet: This is a guide for installing the signal-cli on the Raspberry Pi.
tags: ["Raspberry Pi", "Signal"]
---

At the time of writing this, the signal-cli is at version: `0.11.3` with the libsignal-client being at version: `0.20.0`.  
The OS that I use is [DietPi](https://github.com/MichaIng/DietPi).

# Automatic install

For an automatic install, I provide the following script:  
```
#!/bin/bash

# set version of signal-cli here
export VERSION=0.11.3
# set cpu core count here: notice set this to 1 when the device has 1 GB of ram or less
export CORE_COUNT=1

set -euxo pipefail

if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root or with sudo rights" 1>&2
   exit 1
fi

# script Dependencies
command_check_dependencies=( zip curl )
apt update

for i in "${apt_dependencies[@]}"
do
    if ! command -v $i &> /dev/null
    then
        apt install $i -y
    fi
done

# java
if ! command -v java &> /dev/null
then
    apt install openjdk-17-jdk -y
fi

# delete temp folder if it exists
if [ -d "/tmp/signal-cli-install" ]
then
    rm -r /tmp/signal-cli-install
fi

mkdir /tmp/signal-cli-install

# default install
if [ -d "/opt/signal-cli-${VERSION}" ]
then
    echo "signal-cli is alerady installed with this version: ${VERSION}"
    exit 0
fi

curl --proto '=https' --tlsv1.2 -L -o /tmp/signal-cli-install/signal-cli-"${VERSION}"-Linux.tar.gz https://github.com/AsamK/signal-cli/releases/download/v"${VERSION}"/signal-cli-"${VERSION}"-Linux.tar.gz
tar xf /tmp/signal-cli-install/signal-cli-"${VERSION}"-Linux.tar.gz -C /opt
export LIBVERSION=$(find /opt/signal-cli-"${VERSION}"/lib/ -maxdepth 1 -mindepth 1 -name 'libsignal-client-*' | sed -E 's/\/opt\/signal-cli-[0-9]{1,}.[0-9]{1,}.[0-9]{1,}\/lib\/libsignal-client-*//g' | sed -E 's/.jar//g')
ln -sf /opt/signal-cli-"${VERSION}"/bin/signal-cli /usr/local/bin/

# libsignal
# https://gitlab.com/packaging/libsignal-client/
curl -Lo /tmp/signal-cli-install/libsignal_jni.so "https://gitlab.com/packaging/libsignal-client/-/jobs/artifacts/${LIBVERSION}/raw/libsignal-client/arm64/libsignal_jni.so?job=libsignal-client-arm64"

# replace libsignal_jni.so
zip -d /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar libsignal_jni.so
zip /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar /tmp/signal-cli-install/libsignal_jni.so

# cleanup temp folder
rm -r /tmp/signal-cli-install

/opt/signal-cli-${VERSION}/bin/signal-cli --version

exit 0
```

You can use it by running:  
`sudo wget https://nickwasused.com/scripts/signal-cli-install.sh`  
Notice! Before running scripts from the Internet, check their code.  
`cat ./signal-cli.install.sh`  
Now you can run the script:  
`sudo chmod +x ./signal-cli-install.sh && sudo ./signal-cli.install.sh`  


# Manual install

For this guide, `curl` and `zip` is required. Install it with:  
`sudo apt install curl zip`

## Basic install
First, we need to set the Version of the signal-cli we are installing. You can find the Version code [here](https://github.com/AsamK/signal-cli/releases).  
 
Set the signal-cli version with:   
`export VERSION=0.11.3`.  
After that, we download the signal-cli version:  
`curl --proto '=https' --tlsv1.2 -o signal-cli-"${VERSION}"-Linux.tar.gz https://github.com/AsamK/signal-cli/releases/download/v"${VERSION}"/signal-cli-"${VERSION}"-Linux.tar.gz`  
and unpack it to `/opt`:  
`sudo tar xf signal-cli-"${VERSION}"-Linux.tar.gz -C /opt`.  
Finally, we link it to `/usr/local/bin` so we can use the signal-cli:  
`sudo ln -sf /opt/signal-cli-"${VERSION}"/bin/signal-cli /usr/local/bin/`.  

Now we install the required Java version:  
`sudo apt install openjdk-17-jdk`

### Info

If we try to run `signal-cli` now, then it will fail!

## Replacing the libsignal_jni.so

To fix the problem, we need to build the "native lib for libsignal".

### Downloading the correct file

Before starting to download the file, we need to find the matching version code:   
`export LIBVERSION=$(find /opt/signal-cli-"${VERSION}"/lib/ -maxdepth 1 -mindepth 1 -name 'libsignal-client-*' | sed -E 's/\/opt\/signal-cli-[0-9]{1,}.[0-9]{1,}.[0-9]{1,}\/lib\/libsignal-client-*//g' | sed -E 's/.jar//g')`  

Let's create a temporary directory to store files:  
`curl -Lo /tmp/signal-cli-install/libsignal_jni.so "https://gitlab.com/packaging/libsignal-client/-/jobs/artifacts/${LIBVERSION}/raw/libsignal-client/arm64/libsignal_jni.so?job=libsignal-client-arm64"`

#### Replacing the file

We need to remove the bundled `libsignal_jni.so` from `/opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar`:  
`sudo zip -d /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar libsignal_jni.so`  
and add our own:  
`sudo zip /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar /tmp/signal-cli-install/libsignal_jni.so`

As a last step, we remove the temporary files with:  
`sudo rm -r /tmp/signal-cli-install`

Now we should be able to use the `signal-cli` command with no problems.

# Source

[https://github.com/AsamK/signal-cli#install-system-wide-on-linux](https://github.com/AsamK/signal-cli#install-system-wide-on-linux)
[https://github.com/AsamK/signal-cli/wiki/Provide-native-lib-for-libsignal#manual-build](https://github.com/AsamK/signal-cli/wiki/Provide-native-lib-for-libsignal#manual-build)  
[https://github.com/signalapp/libsignal](https://github.com/signalapp/libsignal)