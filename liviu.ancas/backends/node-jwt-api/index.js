
const apiMetrics = require('prometheus-api-metrics');
const http = require('http');

const hostname = 'localhost';
const port = 3000;
// app.use(apiMetrics());


const server = http.createServer((req, res) => {

  const { method, url } = req;

  console.log(method + " si url " + url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n'+ method + " si url " + url);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

