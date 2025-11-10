// api.js
const http = require('http');

const repairs = [
  { id: 1, name: "Abel Electronics Repair", rating: 4.8 },
  { id: 2, name: "TechFix Hub", rating: 4.5 },
  { id: 3, name: "Quick Mobile Service", rating: 4.9 },
];

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ReTech API');
  } 
  
  else if (req.url === '/repairs' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(repairs));
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});
