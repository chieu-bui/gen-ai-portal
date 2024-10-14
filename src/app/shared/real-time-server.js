const http = require('http');
const es = require('event-stream');
// Create a HTTP server
const server = http.createServer((req, res) => {
    // Check if the request path is /stream

    if (req.url === '/stream' && req.method === 'POST') {
        // Set the response headers
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        });
        // Create a counter variable
        let counter = 0;
        // Create an interval function that sends an event every second
        const interval = setInterval(() => {
            // Increment the counter
            counter++;
            // Create an event object with name, data, and id properties
            const event = {
                name: 'message',
                data: `Hello, this is message number ${counter}`,
                id: counter
            };
            // Convert the event object to a string
            const eventString = `event: ${event.name}\ndata: ${event.data}\nid: ${event.id}\n\n`;
            // Write the event string to the response stream
            res.write(eventString);
            // End the response stream after 10 events
            if (counter === 10) {
                clearInterval(interval);
                res.end();
            }
        }, 1000);
    } else {
        // Handle other requests
        res.writeHead(404);
        res.end('Not found');
    }
});
// Listen on port 3000
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
