#!/bin/sh

rm -rf public .cache packages/website/public packages/website/.cache;
cd packages/website;
yarn install;
yarn build;
cd ../../;
mv ./packages/website/public ./;
yarn build:docs;