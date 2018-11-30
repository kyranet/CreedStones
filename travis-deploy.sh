#!/bin/bash
# Based on https://github.com/discordjs/discord.js/blob/master/travis/deploy.sh
set -e

DONT_COMMIT=false

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "\e[36m\e[1mBuild triggered for PR #${TRAVIS_PULL_REQUEST} to branch \"${TRAVIS_BRANCH}\" - not commiting"
  SOURCE_TYPE="pr"
  DONT_COMMIT=true
elif [ -n "$TRAVIS_TAG" ]; then
  echo -e "\e[36m\e[1mBuild triggered for tag \"${TRAVIS_TAG}\"."
  SOURCE=$TRAVIS_TAG
  SOURCE_TYPE="tag"
else
  echo -e "\e[36m\e[1mBuild triggered for branch \"${TRAVIS_BRANCH}\"."
  SOURCE=$TRAVIS_BRANCH
  SOURCE_TYPE="branch"
fi

if [ $DONT_COMMIT == true ]; then
  echo -e "\e[36m\e[1mNot commiting - exiting early"
  exit 0
fi

echo -e "Building for a branch push - building and deploying."

# Run the webpack build
NODE_ENV=production yarn build:browser

REPO=$(git config remote.origin.url)
SHA=$(git rev-parse --verify HEAD)

# Webpack
TARGET_BRANCH="webpack"
git clone $REPO out -b $TARGET_BRANCH
mv webpack/creedstones.min.js out/creedstones.$SOURCE.min.js

# Commit and push
cd out
git add --all .
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Webpack build: ${SHA}" || true
git push "https://${GH_TOKEN}@${GH_REF}" $TARGET_BRANCH
