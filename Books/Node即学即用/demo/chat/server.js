let net = require("net");

// create TCP
let chatServer = net.createServer();

chatServer.on('connection', function (client) {
  client.write('Hi!\n');
  client.write('Bye!\n');

  client.end();
});

chatServer.listen(9000)
