#!/bin/sh

cwd=$(cd "$(dirname "$0")" || exit; pwd)

git checkout -f HEAD .
cd "${cwd}/contacts-frontend/"
rm -r ./build
npm install
npm run build
cp -r ./build ../contacts-backend

cd "${cwd}/contacts-backend"
npm install
nohup npm start > CD.log 2>&1 &
