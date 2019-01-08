const WebSocket = require('ws');
const { spawn } = require('child_process')

const wsPort = 8080;

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
        console.log(`Server got msg at ${(new Date()).toLocaleDateString()}: `);
        console.log(data);
        console.log()
    })

    socket.on('close', function(){
        console.log(`closed`);
    })
})

const child = spawn('node', ['./serial.js']);
// const child = spawn('node', ['./processtest.js']);

child.stdout.on('data', function(chunk) {
    const msgstr = chunk.toString();
    console.log(`Child process news: `);
    console.log(msgstr);
    
    try {
        const msg = JSON.parse(msgstr);
        if (msg.from === 'device') {
            wss.broadcast(JSON.stringify({ from: 'ctrl', data: msg.data }));
            console.log(`Forwarded control data.`);
        }
    } catch (error) {
        //
    }

    console.log();
})