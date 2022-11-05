#!/bin/bash
git remote update
if git status | grep -q 'use "git pull" to update your local branch'; then
        echo "updating..."
        git stash
        git pull
        hugo
        chmod +x ./update.sh
else
        echo "already up to date"
fi