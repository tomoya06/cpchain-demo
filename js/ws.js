(function() {
    var ws = new WebSocket('ws://127.0.0.1:8080')
    
    ws.onopen = function() {
        console.log('open')
    }
    
    ws.onmessage = function(evt) {
        console.log(evt)
        var msg = JSON.parse(evt.data)
        console.log(msg);
        if (msg.from === 'server') {
            // Use Reveal.slide(number) to switch to a particular slide. Index starts from 0. 
            switch (msg.data) {
                case 's1': Reveal.slide(1); break;
                case 's2': Reveal.slide(2); break;
                case 's3': Reveal.slide(3); break;
                case 's4': Reveal.slide(4); break;
                case 's0': Reveal.slide(0); break;
                default: ;
            }
        }
    }
})()
