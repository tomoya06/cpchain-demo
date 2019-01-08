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
    socket.send(JSON.stringify({from: 'server', data: 'connected'}));

    socket.on('message', function(data) {
        console.log(data);

        const msg = JSON.parse(data);
        if (msg.from === 'device') {
            wss.broadcast(JSON.stringify({ from: 'server', data: msg.data }));
        }
    })

    socket.on('close', function(){
        console.log(`closed`);
    })
})
