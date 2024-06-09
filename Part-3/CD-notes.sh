#!/bin/sh

cwd=$(cd "$(dirname "$0")" || exit; pwd)

git checkout -f HEAD .
cd "${cwd}/notes-frontend/"
rm -r ./build
npm install
npm run build
cp -r ./build ../notes-backend

cd "${cwd}/notes-backend"
npm install
nohup npm start > CD.log 2>&1 &
