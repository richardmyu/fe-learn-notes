const WebSocket = require("ws");

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
  port: 3000
});

wss.on("connection", function(wss) {
  console.log(`[SERVER] connection()`);
  wss.on("message", function(message) {
    console.log(`[SERVER] Received: ${message}`);
    wss.send(`ECHD: ${message}`, (err) => {
      if (err) {
        console.log(`[SERVER] ERROR: ${ERR}`);
      }
    });
  });
});
