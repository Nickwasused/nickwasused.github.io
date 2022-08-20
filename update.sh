#!/bin/bash
git remote update
if git status | grep -q 'use "git pull" to update your local branch'; then
        echo "updating..."
        git pull
        deno task build
        systemctl restart nickwasused
else
        echo "already up to date"
fi