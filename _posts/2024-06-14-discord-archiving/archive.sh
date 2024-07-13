#!/bin/bash

set -eu

if [ $# -eq 0 ]; then
  echo "Error: no arguments provided"
  exit 1
fi

LANG=en_us_8859_1
GID=$1
G_LANG=$2
IDENT=$(echo "discord-$GID-$(date '+%d%m%Y')")
# TMP_DIR=$(echo "/home/$USER/$GID")
TMP_DIR=$(echo "/tmp/$GID")
TOKEN=your_token

get_name()
{
	TMP_ID=$1
	TMP_SERVER=$(./cli/DiscordChatExporter.Cli guilds --token $TOKEN | grep $TMP_ID)
	TMP_NAME=$(echo "$TMP_SERVER" | grep -E -o "\|\s.{1,}$" | sed 's/| //')
	echo $TMP_NAME
}

echo $IDENT

TMP_RESULT=$(./ia search -f=identifier $IDENT)

if [ -z "${TMP_RESULT}" ]; then
    echo "Identifier dosen't exist, continuing"
else
	echo "Identifier exists, exiting"
	exit 0
fi

TITLE="$(get_name $GID) $(date '+%d.%m.%Y')"
echo $TITLE

DESC="This contains the Discord messages in JSON format split into chunks the size of 10000 messages.
channels.txt contains all channels present in the discord at the given date.
Analytics from https://chatanalytics.app are stored in result.html.
Messages up to $(date '+%B %d, %Y'), are saved."
echo $DESC

if [ -d "$TMP_DIR" ]; then
	rm -r "$TMP_DIR"
fi

mkdir "$TMP_DIR"

echo "saving channels"
./cli/DiscordChatExporter.Cli channels --guild $GID --token $TOKEN > $TMP_DIR/channels.txt

echo "saving messages"
./cli/DiscordChatExporter.Cli exportguild -f Json --markdown false -p 10000 --include-threads All -t $TOKEN -o $TMP_DIR --guild $GID

npx chat-analytics -p discord -i "$TMP_DIR/*.json" -o $TMP_DIR/report.html

./ia --insecure upload $IDENT $TMP_DIR/* --metadata="mediatype:texts"  --metadata="collection:opensource_media" --metadata="language:$G_LANG" --metadata="description:$DESC" --metadata="title:$TITLE" --metadata="publicdate:$(date '+%Y-%m-%d')" --metadata="subject:discord;DiscordChatExporter;"

rm -r $TMP_DIR

exit 0

