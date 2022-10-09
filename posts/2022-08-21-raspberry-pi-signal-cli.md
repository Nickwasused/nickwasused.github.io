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

You can use it by running:  
`sudo wget https://nickwasused.com/scripts/signal-cli-install.sh`  
Notice! Before running scripts from the Internet, check their code.  
`cat ./signal-cli.install.sh`  
Now you can run the script:  
`sudo chmod +x ./signal-cli-install.sh && sudo ./signal-cli.install.sh`  


# Manual install

# precautions

You need to check the size of your `/tmp` directory with the following command:  
`df -h`

There will be a line that looks like this:  
`tmpfs           1.0G  1.0M 1023M   1% /tmp`

Notice that is reads `1.0G`. This is too small as the installation requires about 1.25G.

You can expand the size of your `/tmp` directory with this command:  
`sudo mount -o remount,size=2G /tmp/`

# required tools

For this guide, `curl` and `zip` are required. Install them with:  
`sudo apt install curl zip`

(If there is an error try to run `sudo apt update`)

## Basic install
First, we need to set the Version of the signal-cli we are installing. You can find the Version code [here](https://github.com/AsamK/signal-cli/releases).  
 
Set the signal-cli version with:   
`export VERSION=0.11.3`.  
After that, we download the signal-cli version:  
`curl --proto '=https' --tlsv1.2 -o signal-cli-"${VERSION}"-Linux.tar.gz https://github.com/AsamK/signal-cli/releases/download/v"${VERSION}"/signal-cli-"${VERSION}"-Linux.tar.gz`  
and unpack it to `/opt`:  
`sudo tar xf signal-cli-"${VERSION}"-Linux.tar.gz -C /opt`. 
After extracting the code remove the file:  
`sudo rm signal-cli-"${VERSION}"-Linux.tar.gz`  
Finally, we link it to `/usr/local/bin` so we can use the signal-cli:  
`sudo ln -sf /opt/signal-cli-"${VERSION}"/bin/signal-cli /usr/local/bin/`.  

As the last step for the basic install, we install the required Java version:  
`sudo apt install openjdk-17-jdk`

### Info

If we try to run `signal-cli` now, then it will fail! (But only if your system type is not `x86_64`)

## Building the libsignal_jni.so

To fix the problem, we need to build the "native lib for libsignal".

Notice! If you have a 1GB Raspberry Pi then please read [#1-gb-ram](#1-gb-ram).

### Dependencies

First, we need to install some dependencies:  
  
#### apt
`sudo apt install protobuf-compiler clang libclang-dev cmake make`  

#### rust
`sudo curl https://sh.rustup.rs -sSf | sudo sh -s -- --default-toolchain nightly-aarch64-unknown-linux-gnu -y` 

### Build libsignal

Let's create a temporary directory to store files:  
`sudo mkdir /tmp/signal-cli-install && cd /tmp/signal-cli-install`

Before starting to download the libsignal source-code, we need to find the matching version code:   
`export LIBVERSION=$(find /opt/signal-cli-"${VERSION}"/lib/ -maxdepth 1 -mindepth 1 -name 'libsignal-client-*' | sed -E 's/\/opt\/signal-cli-[0-9]{1,}.[0-9]{1,}.[0-9]{1,}\/lib\/libsignal-client-*//g' | sed -E 's/.jar//g')`  

After that, we download the source code:  
`sudo curl --proto '=https' --tlsv1.2 -o /tmp/signal-cli-install/v"${LIBVERSION}".tar.gz https://github.com/signalapp/libsignal/archive/refs/tags/v"${LIBVERSION}".tar.gz`

And now we need to unpack the downloaded code:  
`sudo tar xf /tmp/signal-cli-install/v"${LIBVERSION}".tar.gz -C /tmp/signal-cli-install/ && mv libsignal-"${LIBVERSION}" libsignal`   

After extracting the code remove the archive as it is no longer needed:
`sudo rm /tmp/signal-cli-install/v"${LIBVERSION}".tar.gz`

Change into the java directory of the downloaded code:  
`cd libsignal/java`  

We disable some android stuff as we don\`t want to build for android:  
`sudo sed -i "s/include ':android'//" /tmp/signal-cli-install/libsignal/java/settings.gradle`  

#### 1 GB Ram

While building libsignal I ran into a problem with the ram usage on the Raspberry Pi 3b, because eventually, the 1 GB of ram would be full. This would result in a locked-up Pi that I had to hard reset. We can work around this problem by limiting the CPU usage to 1 Core.  
(I don't know if a 2 GB Raspberry Pi 4 can run all 4 Cores.)

`sudo sed -i "s/cargo build /cargo build -j ${CORE_COUNT} /" /tmp/signal-cli-install/libsignal/java/build_jni.sh`

##### Update 08.10.2022

I could not get libsignal to compile on a Raspberry Pi with 1GB of ram.  

#### Starting the Build

We can start the build with: 
`sudo /tmp/signal-cli-install/libsignal/java/build_jni.sh desktop`  

We need to remove the bundled `libsignal_jni.so` from `/opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar`:  
`sudo zip -d /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar libsignal_jni.so`  
and add our own:  
`sudo zip /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar /tmp/signal-cli-install/libsignal/target/release/libsignal_jni.so`

Since Version 0.11.3 the replacing is not working for me, because of that we add the `libsignal_jni.so` to the default Java library path.  
For that create it if it dosen\`t exist: 
`sudo mkdir -p /usr/java/packages/lib`  
and finally copy the file to that folder:  
`sudo cp /tmp/signal-cli-install/libsignal/target/release/libsignal_jni.so /usr/java/packages/lib`

Now we can remove the temporary files:  
`sudo rm -r /tmp/signal-cli-install`

We should set the permissions for the new files:  
`sudo chown root:root /usr/java/packages/lib/libsignal_jni.so`  
`sudo chmod 755 /usr/java/packages/lib/libsignal_jni.so`  
`sudo chmod 755 -R /opt/signal-cli-${VERSION}`  
`sudo chown root:root -R /opt/signal-cli-${VERSION}`

Now we should be able to use the `signal-cli` command with no problems.

Try is with:  
`signal-cli --version`

# Source

[https://github.com/AsamK/signal-cli#install-system-wide-on-linux](https://github.com/AsamK/signal-cli#install-system-wide-on-linux)
[https://github.com/AsamK/signal-cli/wiki/Provide-native-lib-for-libsignal#manual-build](https://github.com/AsamK/signal-cli/wiki/Provide-native-lib-for-libsignal#manual-build)  
[https://github.com/signalapp/libsignal](https://github.com/signalapp/libsignal)