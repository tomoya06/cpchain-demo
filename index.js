const wsPort = 8080;

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: wsPort });

console.log(`Websocket listerning on port ${wsPort}`);

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function (socket) {
    console.log(`New Connection.`);
    socket.send(`Connected`);

    socket.on('message', function(data) {
        console.log(data);
    })
})
