var WebsocketServer = require("websocket").server;
var http = require("http");

var log = function(message){ console.log((new Date()) + ": " + message) }

// initialize any old http server
var server = http.createServer(
  function(request, response){ /* it's like there's no server */ }
);
server.listen(8088, function(){ });

// create a bucket of connections
var connections = [];

// wire up the sockets
var socketServer = new WebsocketServer({ httpServer: server });
socketServer.on('request', function(request){
    var connection = request.accept(null, request.origin);
    connections.push(connection);
    log("connection accepted");
    connection.on('message', function(message){
      log("message received: " + message.utf8Data);
      connection.sendUTF('i got that thing you sent me')
    });
    connection.on('close', function(message){
      log("connection closed!")
    });
});

var interval = setInterval(function(){
  for (index in connections) {
    var connection = connections[index];
    connection.sendUTF('{ "ping": "pong" }');
  }
}, 1000)
