var jwt = require('jsonwebtoken');
var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672';

const jwtWorkerQueue = 'jtwrequest';
const workerBackQueue = "backrequest";
const workername = "jwt01"
const expiresIn = '500000';
let msgtosend = "";

function start() {
    amqp.connect(CONN_URL, function (err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });

        conn.on("close", function () {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });

        conn.createChannel(function (err, ch) {

            ch.on("error", function (err) {
                console.error("[AMQP] channel error", err.message);
            });
            ch.on("close", function () {
                console.log("[AMQP] channel closed");
            });

            console.log(" " + Date.now().toString() + " - [AMQP] JWT Worker connected");

            // creating jwt working queue
            ch.assertQueue(jwtWorkerQueue, {
                durable: true
            });

            // create response queue (RPC)
            ch.assertQueue(workername, {
                durable: true
            });

            ch.purgeQueue(workername);  // purge own RPC queue
            ch.prefetch(1);  // get only one message a time
            ch.consume(jwtWorkerQueue, (msg) =>{

                request = JSON.parse(msg.content);
                console.log(" " + Date.now().toString() + " - Processing request - " + JSON.stringify(request) + " !");

                switch (request.query) {
                    case "auth":
                        // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                        // console.log(token)
                        // ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "true", "token": token })));

                        // var msgtosend = {client: "prod1", query:"auth", user:"liviu", pass:"liviu123"};  // auth user and password, returns true or false
                        msgtosend = { "client": workername, "query": "auth", "user": request.user, "pass": request.pass }
                        ch.sendToQueue(workerBackQueue, Buffer.from(JSON.stringify(msgtosend)), { replyTo: workername });

                        ch.consume(workername, function (workerResp) {
                            workerResult = JSON.parse(workerResp.content);
                            if (workerResult.response == "true") {
                                let payload = { "id": workerResult.id.toString() };
                                jwt.sign(payload, workerResult.hash.toString(), { expiresIn: expiresIn }, function (err, token) {
                                    if (err) ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg-gen": "error generating token" })));
                                    else ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "true", "token": token })));
                                });
                                // let token = jwt.sign(payload, workerResult.hash.toString(), { expiresIn: expiresIn });
                                // if(token != null) console.log(token.toString());

                            } else {
                                ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "Authentication Failed" })));
                            }
                            ch.ack(workerResp);
                        });
                        break;
                    case "check":  // check jwt tocken
                        // var decoded = jwt.verify(request.token, 'shhhhh');
                        // console.log(JSON.stringify(decoded));
                        // ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "success", "decoded": decoded })));

                        // //decode token, get user ID 
                        var decodede = jwt.decode(request.token, { complete: true });

                        msgtosend = { "client": workername, "query": "auth", "hash": "1", "id": decodede.payload.id }
                        ch.sendToQueue(workerBackQueue, Buffer.from(JSON.stringify(msgtosend)), { replyTo: workername });

                        ch.consume(workername, function (workerResp) {

                            workerResult = JSON.parse(workerResp.content);
                            if (workerResult.response == "true") {
                                jwt.verify(request.token, workerResult.hash.toString(), function (err, decoded) {
                                    if (err) ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg-check": err.message })));
                                    else ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "success", "decoded": decoded })));
                                });
                                // let token = jwt.verify(request.token, workerResult.hash.toString());
                                // if (token !=null) console.log(token.toString());
                            } else {
                                ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "Error checking token" })));
                            }
                            ch.ack(workerResp);                        
                        });
                        break;
                    default:
                        console.log("wrong query");
                        break;
                }
                ch.ack(msg);
            }, { noAck: false });
        });
    });

}

start();