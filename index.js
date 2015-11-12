var jsdom = require('jsdom').jsdom;
var Canvas = require('canvas');
var localStorage = require('localStorage');
var raf = require('raf');
var blessed = require('blessed');

jsdom.env(
  '<!doctype html><html><body></body></html>',
  [],
  function (err, window) {
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
    global.location = window.location;
    global.Image = Canvas.Image
    global.localStorage = localStorage;
    global.requestAnimationFrame = raf;
    global.alert = function(msg) {console.log(msg);};


    // Create a screen object.
    var screen = blessed.screen({
      smartCSR: true,
      fullUnicode: true
    });

    var map = blessed.box({
      width: 34,
      height: 13,
      top: 'center',
      left: 'center'
    });

    var tiles = [];
    for (var x = 0; x < 17; x++) {
      for (var y = 0; y < 13; y++) {
        // Create a box perfectly centered horizontally and vertically.
        var text = blessed.text({
          top: y,
          left: x*2,
          width: 2,
          height: 1,
          content: '　',
          tags: true,
          style: {
            fg: 'white'
          }
        });
        tiles[x + y * 17] = text;

        // Append our box to the screen.
        map.append(text);
      }
    }

    screen.append(map);

    // Quit on Escape, q, or Control-C.
    screen.key(['C-c'], function(ch, key) {
        return process.exit(0);
    });

    // Render the screen.
    screen.render();
    // TODO ひとまずグローバルにおいて動く状態にする。余裕があればPIXIと入れ替える形でうまく動くようにしたい
    global.blessedScreen = screen;
    global.blessedTiles = tiles;


    var createElementOriginal = document.createElement;
    document.createElement = function() {
      if (arguments[0] === 'canvas') {
        return new Canvas();
      }
      return createElementOriginal.apply(document, arguments);
    };


    require('./tmp/concat.js');
  }
);
