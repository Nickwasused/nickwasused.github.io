#!/bin/bash

# set version of signal-cli here
export VERSION=0.11.2
# set cpu core count here: notice set this to 1 when the device has 1 GB of ram or less
export CORE_COUNT=1

set -euxo pipefail

if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root or with sudo rights" 1>&2
   exit 1
fi

# script Dependencies
command_check_dependencies=( zip curl clang cmake make )
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

# protobuf-compiler
if ! command -v protoc &> /dev/null
then
    apt install protobuf-compiler -y
fi

# libclang-dev
apt install libclang-dev -y

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

# rust
if ! command -v cargo &> /dev/null
then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
fi
source "$HOME/.cargo/env"

# libsignal
curl --proto '=https' --tlsv1.2 -L -o /tmp/signal-cli-install/libsignal.tar.gz https://github.com/signalapp/libsignal/archive/refs/tags/v"${LIBVERSION}".tar.gz
tar xf /tmp/signal-cli-install/libsignal.tar.gz -C /tmp/signal-cli-install/
mv /tmp/signal-cli-install/libsignal-"${LIBVERSION}" /tmp/signal-cli-install/libsignal
sed -i "s/include ':android'//" /tmp/signal-cli-install/libsignal/java/settings.gradle
sed -i "s/cargo build /cargo build -j ${CORE_COUNT} /" /tmp/signal-cli-install/libsignal/java/build_jni.sh
/tmp/signal-cli-install/libsignal/java/build_jni.sh desktop

# replace libsignal_jni.so
zip -d /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar libsignal_jni.so
zip /opt/signal-cli-${VERSION}/lib/libsignal-client-*.jar /tmp/signal-cli-install/libsignal/target/release/libsignal_jni.so

# cleanup temp folder
rm -r /tmp/signal-cli-install

/opt/signal-cli-${VERSION}/bin/signal-cli -v

exit 0