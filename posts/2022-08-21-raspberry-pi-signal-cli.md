
---
title: "Installing the signal-cli on the Raspberry Pi."
publish_date: 2022-08-21
background: white
description: This is a guide for installing the signal-cli on the Raspberry Pi.
---

At the time of writing this, the signal-cli is at version: `0.10.11` with the libsignal-client being at version: `0.19.3`

# Basic install
First, we need to set the Version of the signal-cli we are installing:  
`export VERSION=0.10.11`.  
After that, we download the signal-cli version:  
`wget https://github.com/AsamK/signal-cli/releases/download/v"${VERSION}"/signal-cli-"${VERSION}"-Linux.tar.gz`  
and unpack it to `/opt`:  
`sudo tar xf signal-cli-"${VERSION}"-Linux.tar.gz -C /opt`.  
Now we link it to `/usr/local/bin` so we can use the signal-cli:  
`sudo ln -sf /opt/signal-cli-"${VERSION}"/bin/signal-cli /usr/local/bin/`.  

## Info

If we try to run `signal-cli` now, then it will fail!

# Building the libsignal_jni.so
## Dependencies

First, we need to install some dependencies:  
`sudo apt update && sudo apt install protobuf-compiler clang libclang-dev cmake make`  
`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`  
After that, we can start building libsignal.  

## Build libsignal

First, we need to get the required version by running:  
`export LIBVERSION=$(find /opt/signal-cli-"${VERSION}"/lib/ -maxdepth 1 -mindepth 1 -name 'libsignal-client-*' | sed -E 's/\/opt\/signal-cli-[0-9]{1,}.[0-9]{1,}.[0-9]{1,}\/lib\/libsignal-client-*//g' | sed -E 's/.jar//g')`  
After that, we download the source code:  
`wget https://github.com/signalapp/libsignal/archive/refs/tags/v"${LIBVERSION}".tar.gz`  
After that, we need to unpack the downloaded code and remove the `.tar.gz`: `sudo tar xf v"${LIBVERSION}".tar.gz -C ./libsignal && mv libsignal-"${LIBVERSION}" libsignal`   
Now we change into the java directory: `cd libsignal/java`  
And after that, we disable some android stuff: `sed -i "s/include ':android'//" settings.gradle`  

### 1 GB Ram


If you have a Raspberry Pi with 1 GB of ram, then run this command to limit the CPU usage:  

`sed -i 's/cargo build /cargo build -j 1 /gm;t;d' build_jni.sh`  
In this case we limit it to 1 CPU because if we use all 4 Cores this will exceed the 1 GB of ram of the Raspberry Pi and lock it up.


### Starting the Build

Now we start the build with: 
`./build_jni.sh desktop`  

After that is done, we copy the generated `libsignal_jni.so` to the signal-cli folder:  
`cp ../target/release/libsignal_jni.so /opt/signal-cli-${VERSION}/lib/`
and now we change to the `signal-cli/lib` folder:  
`cd /opt/signal-cli-"${VERSION}"/lib`

Now we remove the old incompatible `libsignal_jni.so` from the signal-cli:
`zip -d libsignal-client-*.jar libsignal_jni.so`  
and now we can finally add our one:  
`zip libsignal-client-*.jar libsignal_jni.so`

Now we should be able to use the `signal-cli` command with no problems.

# Source

[https://github.com/AsamK/signal-cli#install-system-wide-on-linux](https://github.com/AsamK/signal-cli#install-system-wide-on-linux)
[https://github.com/AsamK/signal-cli/wiki/Provide-native-lib-for-libsignal#manual-build](https://github.com/AsamK/signal-cli/wiki/Provide-native-lib-for-libsignal#manual-build)  
[https://github.com/signalapp/libsignal](https://github.com/signalapp/libsignal)

