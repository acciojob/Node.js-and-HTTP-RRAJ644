const http = require('http');

// Create the HTTP server
const server = http.createServer((req, res) => {
  const { method, url, headers } = req;

  if (method === 'GET' || method === 'POST') {
    // Collect request details
    let body = '';

    // Handle data for POST requests
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      // Build the response JSON object
      const response = {
        method,
        url,
        headers,
        body: body ? JSON.parse(body) : null,
      };

      // Respond to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response, null, 2));
    });
  } else {
    // Handle unsupported methods
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
