var counter = 0;

setInterval(() => {
    process.stdout.write(JSON.stringify({ from: 'device', data: counter+'' }))
    counter = (counter + 1) % 5;
}, 2000);