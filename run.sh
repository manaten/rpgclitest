#!/bin/sh

mkdir -p tmp
cat \
  js/libs/pixi.js \
  js/libs/fpsmeter.js \
  js/libs/lz-string.js \
  js/rpg_core.js \
  js/rpg_managers.js \
  js/rpg_objects.js \
  js/rpg_scenes.js \
  js/rpg_sprites.js \
  js/rpg_windows.js \
  js/plugins.js \
  js/main.js > ./tmp/concat.js

node index.js
