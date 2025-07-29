#!/bin/sh

npm install
npm run make
mv out/cord-linux-x64 $HOME/.local/cord
echo "[Desktop Entry]
Type=Application
Name=Cord
Exec=$HOME/.local/cord/cord
Comment=Discord web client wrapper with disabled telemetry and custom theme support
Terminal=false
Icon=discord
Categories=GNOME;GTK;Network;
PrefersNonDefaultGPU=false" > $HOME/.local/share/applications/Cord.desktop
