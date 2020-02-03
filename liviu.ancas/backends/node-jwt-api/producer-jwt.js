// var msgtosend = {client: "prod1", query:"get"};  // comanda cu id si items details
var tokennn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJpYXQiOjE1Nzg2ODk2NzksImV4cCI6MTU3ODY4OTY4NH0.NulqP7bzxqE-KTdxu4NILtH21FwGhWSS_zLgU-7ocSU"
var msgtosend = { client: "prod1", query: "check", token: tokennn };  // comanda cu id si items details
// var msgtosend = {client: "prod1", query:"users"};   // all users request answer without pass
// var msgtosend = { client: "prod1", query: "users", id: "1" };   // user request based on id answer without pass
// var msgtosend = { client: "prod1", query: "auth", user: "test", pass: "test123" };  // auth user and password, returns true or false
// var msgtosend = { client: "prod1", query: "auth", user: "liviu", pass: "liviu123" };  // auth user and password, returns true or false

// var msgtosend = {client: "prod1", query:"auth", hash:"epK0JDsbJfE", id:"1"};  // auth user and password, returns true or false


var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672';
let i = 0;

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    var queue = 'jtwrequest'
    ch.assertQueue(queue, {
      durable: true
    });

    ch.assertQueue("Prod1", {
      durable: true
    });

    ch.prefetch(1);
    ch.consume('Prod1', function (msg) {
      console.log('.....');
      console.log("Prod1:" + msg.content.toString() + " si val " + i++);

      ch.ack(msg);
    },{ noAck: false }

    );
    setInterval(function () {
      ch.sendToQueue(queue, Buffer.from(JSON.stringify(msgtosend)), { replyTo: "Prod1" });
      console.log("message sent");
    }, 50);
  });
});
