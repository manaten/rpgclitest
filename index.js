var jsdom = require('jsdom').jsdom;
var Canvas = require('canvas');
var localStorage = require('localStorage');
var raf = require('raf');

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
