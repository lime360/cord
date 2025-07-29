#!/bin/sh

npm install
npm run make
mv out/cord-linux-x64 $HOME/.local/cord
cp Cord.desktop $HOME/.local/share/applications/Cord.desktop
