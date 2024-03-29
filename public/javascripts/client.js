window.addEventListener('load', function() {
  console.log('loaded');
  var socket = io.connect('http://localhost:3000/', { query: "presenter=false" });
  socket.on('connect', function() {
    var term = new Terminal({
      cols: 80,
      rows: 24,
      screenKeys: true
    });

    //term.on('data', function(data) {
    //  socket.emit('data', data);
    //});

    term.on('title', function(title) {
      document.title = title;
    });

    term.open(document.body);

    //term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');

    socket.on('data', function(data) {
      term.write(data);
    });

    socket.on('disconnect', function() {
      term.destroy();
    });
  });
}, false);
