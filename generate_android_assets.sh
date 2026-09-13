#!/usr/bin/env bash
set -e

SOURCE="public/icon.png"
RES_DIR="android/app/src/main/res"

echo "Generating Android mipmap icons from $SOURCE..."

# Standard launcher icons
convert "$SOURCE" -resize 48x48 "$RES_DIR/mipmap-mdpi/ic_launcher.png"
convert "$SOURCE" -resize 72x72 "$RES_DIR/mipmap-hdpi/ic_launcher.png"
convert "$SOURCE" -resize 96x96 "$RES_DIR/mipmap-xhdpi/ic_launcher.png"
convert "$SOURCE" -resize 144x144 "$RES_DIR/mipmap-xxhdpi/ic_launcher.png"
convert "$SOURCE" -resize 192x192 "$RES_DIR/mipmap-xxxhdpi/ic_launcher.png"

# Round launcher icons
convert "$SOURCE" -resize 48x48 "$RES_DIR/mipmap-mdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 72x72 "$RES_DIR/mipmap-hdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 96x96 "$RES_DIR/mipmap-xhdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 144x144 "$RES_DIR/mipmap-xxhdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 192x192 "$RES_DIR/mipmap-xxxhdpi/ic_launcher_round.png"

# Foreground icons for adaptive launcher
convert "$SOURCE" -resize 108x108 -gravity center -background none -extent 108x108 "$RES_DIR/mipmap-mdpi/ic_launcher_foreground.png"
convert "$SOURCE" -resize 162x162 -gravity center -background none -extent 162x162 "$RES_DIR/mipmap-hdpi/ic_launcher_foreground.png"
convert "$SOURCE" -resize 216x216 -gravity center -background none -extent 216x216 "$RES_DIR/mipmap-xhdpi/ic_launcher_foreground.png"
convert "$SOURCE" -resize 324x324 -gravity center -background none -extent 324x324 "$RES_DIR/mipmap-xxhdpi/ic_launcher_foreground.png"
convert "$SOURCE" -resize 432x432 -gravity center -background none -extent 432x432 "$RES_DIR/mipmap-xxxhdpi/ic_launcher_foreground.png"

echo "Generating Android splash screens..."
# Generate splash screens with dark background #060614 and centered logo
mkdir -p "$RES_DIR/drawable"
convert "$SOURCE" -resize 200x200 -background "#060614" -gravity center -extent 480x800 "$RES_DIR/drawable/splash.png"

convert "$SOURCE" -resize 140x140 -background "#060614" -gravity center -extent 320x480 "$RES_DIR/drawable-port-mdpi/splash.png"
convert "$SOURCE" -resize 200x200 -background "#060614" -gravity center -extent 480x800 "$RES_DIR/drawable-port-hdpi/splash.png"
convert "$SOURCE" -resize 280x280 -background "#060614" -gravity center -extent 720x1280 "$RES_DIR/drawable-port-xhdpi/splash.png"
convert "$SOURCE" -resize 360x360 -background "#060614" -gravity center -extent 960x1600 "$RES_DIR/drawable-port-xxhdpi/splash.png"
convert "$SOURCE" -resize 480x480 -background "#060614" -gravity center -extent 1280x1920 "$RES_DIR/drawable-port-xxxhdpi/splash.png"

convert "$SOURCE" -resize 140x140 -background "#060614" -gravity center -extent 480x320 "$RES_DIR/drawable-land-mdpi/splash.png"
convert "$SOURCE" -resize 200x200 -background "#060614" -gravity center -extent 800x480 "$RES_DIR/drawable-land-hdpi/splash.png"
convert "$SOURCE" -resize 280x280 -background "#060614" -gravity center -extent 1280x720 "$RES_DIR/drawable-land-xhdpi/splash.png"
convert "$SOURCE" -resize 360x360 -background "#060614" -gravity center -extent 1600x960 "$RES_DIR/drawable-land-xxhdpi/splash.png"
convert "$SOURCE" -resize 480x480 -background "#060614" -gravity center -extent 1920x1280 "$RES_DIR/drawable-land-xxxhdpi/splash.png"

echo "All Android launcher and splash assets successfully generated!"
