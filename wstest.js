const WebSocket = require("ws")

const ws = new WebSocket('ws://127.0.0.1:8080')

var counter = 0

ws.on("open", function() {
    setInterval(() => {
        ws.send(JSON.stringify({from: 'device', data: `s${counter}`}))
        counter = (counter+1)%6
    }, 2000);    
})