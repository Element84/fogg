#!/bin/sh

rm -rf public .cache;
rm -rf packages/website/public packages/website/.cache;
rm -rf packages/earth-search/public packages/earth-search/.cache;

cd packages/website;
yarn install;
yarn build;
cd ../../;

cd packages/earth-search;
yarn install;
yarn build;
cd ../../

mv ./packages/website/public ./;
mv ./packages/earth-search/public/ ./public/earth-search

yarn build:docs;