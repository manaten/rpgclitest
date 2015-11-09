var jsdom = require('jsdom').jsdom;
var Canvas = require('canvas');
var localStorage = require('localStorage');
global.localStorage = localStorage;


jsdom.env(
  '<!doctype html><html><body></body></html>',
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;

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
