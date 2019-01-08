(function() {
    var ws = new WebSocket('ws://127.0.0.1:8080')
    
    ws.onopen = function() {
        console.log('open')
    }
    
    ws.onmessage = function(evt) {
        console.log(evt)
        var msg = JSON.parse(evt.data)
        console.log(msg);
        if (msg.from === 'ctrl') {
            // TODO: Use Reveal.slide(number) to switch to a particular slide. Index starts from 0. 
            // TODO: msg.data is the control signal. Must be the same to the message sent directly from your iot device 
            // (or, if being edited via editSerialData() function in serial.js in the server project, the edited one. )
            switch (msg.data) {
                case '1': Reveal.slide(1); break;
                case '2': Reveal.slide(2); break;
                case '3': Reveal.slide(3); break;
                case '4': Reveal.slide(4); break;
                case '0': Reveal.slide(0); break;
                default: ;
            }
        }
    }
})()
