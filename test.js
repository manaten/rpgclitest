var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true
});

screen.title = 'my window title';

var map = blessed.box({
  width: 34,
  height: 13,
  top: 'center',
  left: 'center'
});

for (var x = 0; x < 17; x++) {
  for (var y = 0; y < 13; y++) {
    // Create a box perfectly centered horizontally and vertically.
    var text = blessed.text({
      top: y,
      left: x*2,
      width: 2,
      height: 1,
      content: '＠',
      tags: true,
      style: {
        fg: 'white',
        bg: 'magenta'
      }
    });

    // Append our box to the screen.
    map.append(text);
  }
}

screen.append(map);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();
