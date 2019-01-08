const SerialPort = require("serialport");  

// TODO: change the name in your own case, so as the serial setting if needed.  
const serialPortName = 'COM4';

var serialPort = new SerialPort(
    serialPortName, {
        baudRate: 9600, 
        dataBits: 8, 
        parity: 'none',
        stopBits: 1,
        flowControl: false,
        autoOpen: false
    }, false
);

serialPort.open(function (error) {
    if (error) {
        console.log(`Serial open error: ${error}`);
        ws.close();
    } else {
        console.log(`Serial Listening on ${serialPortName}`);

        serialPort.on('data', function (data) {
            process.stdout.write(JSON.stringify({ from: 'device', data: editSerialData(data) }));
        })
    }
});

// TODO: edit serial data before being sent to the websocket server process.
// here, only the first character of the data would remain. 
function editSerialData(data) {
    return data.toString().slice(0,1);
}