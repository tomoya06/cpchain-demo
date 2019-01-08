const SerialPort = require("serialport");  //引入模块
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

serialPort.open(function (error) {
    if (error) {
        console.log(`Serial open error: ${error}`);
    } else {
        console.log(`Serial Listening on ${serialPortName}`);
        serialPort.on('data', function (data) {
            console.log(`Serial data: ${data}`);
            wss.broadcast(data);
        })
    }
});