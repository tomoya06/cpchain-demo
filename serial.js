const SerialPort = require("serialport");  
const WebSocket = require("ws");

const serialPortName = 'COM1'; //定义串口名
var serialPort = new SerialPort(
    serialPortName, {
        baudRate: 9600,  //波特率
        dataBits: 8,    //数据位
        parity: 'none',   //奇偶校验
        stopBits: 1,   //停止位
        flowControl: false,
        autoOpen: false
    }, false);

const ws = new WebSocket('ws://127.0.0.1:8080')

ws.on("open", function() {
    console.log('open');
})

serialPort.open(function (error) {
    if (error) {
        console.log(`Serial open error: ${error}`);
        ws.close();
    } else {
        console.log(`Serial Listening on ${serialPortName}`);

        serialPort.on('data', function (data) {
            console.log(`Serial data: ${data}`);
            // wss.broadcast(data);
            ws.send(JSON.stringify({from: 'device', data: data}));
        })
    }
});