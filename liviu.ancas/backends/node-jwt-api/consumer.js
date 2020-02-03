const http = require('http');
const ch = null;


const hostname = 'localhost';
const port = 3000;

var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672';
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('backresponse', function (msg) {
      console.log('.....');
      setTimeout(function(){
        console.log("Message:", msg.content.toString());
      },4000);
      },{ noAck: true }
    );
  });
});



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