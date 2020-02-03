var jwt = require('jsonwebtoken');
var amqp = require('amqplib/callback_api');
// const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672?heartbeat=60';


const mqUser = process.env.RABBITMQUSER;
const mqPass = process.env.RABBITMQPASS;
const mqHost = process.env.RABBITMQHOST;
const mqPort = process.env.RABBITMQPORT;
const workername = process.env.WORKERNAME;
const expiresIn = process.env.JWTEXPIREIN;

const jwtWorkerQueue = 'jtwrequest';
const workerBackQueue = "backrequest";
// const workername = "jwt01"
// const expiresIn = '500000';

const CONN_URL = 'amqp://'+mqUser+':'+mqPass+'@'+mqHost+':'+mqPort+'?heartbeat=60';


function start() {

    var open = require('amqplib').connect(CONN_URL);

    amqp.connect(CONN_URL, function (err, conn) {
        if (err) {
            console.error("[AMQP]-"+workername, err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP]-"+workername +" conn error", err.message);
            }
        });

        conn.on("close", function () {
            console.error("[AMQP]-"+workername +" reconnecting");
            return setTimeout(start, 1000);
        });

        conn.createChannel(function (err, ch) {

            ch.on("error", function (err) {
                console.error("[AMQP]-"+workername +" channel error", err.message);
            });
            ch.on("close", function () {
                console.log("[AMQP]-"+workername +" channel closed");
            });

            console.log("[AMQP]-"+workername  + Date.now().toString() + " - JWT Worker connected");

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
            ch.consume(jwtWorkerQueue, async (msg) => {

                request = JSON.parse(msg.content);
                console.log("[AMQP]-"+workername + " " + Date.now().toString() + " - Processing request - " + JSON.stringify(request) + " !");

                let msgtosend = "";
                switch (request.query) {
                    case "auth":

                        msgtosend = { "client": workername, "query": "auth", "user": request.user, "pass": request.pass }
                        ch.sendToQueue(workerBackQueue, Buffer.from(JSON.stringify(msgtosend)), { replyTo: workername });

                        await open.then(function (conn) {
                            return conn.createChannel();
                        }).then(function (ch2) {
                            ch2.prefetch(1);
                            return ch2.assertQueue(workername).then(function (ok) {
                                return ch2.consume(workername, function (workerResp) {
                                    if (workerResp !== null) {
                                        ch2.ack(workerResp);
                                        ch2.close(function () { conn.close() })
                                        workerResult = JSON.parse(workerResp.content);

                                        if (workerResult.response == "true") {
                                            let payload = { "id": workerResult.id.toString() };
                                            jwt.sign(payload, workerResult.hash.toString(), { expiresIn: expiresIn }, (err, token) => {
                                                if (err) ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg-gen": "error generating token" })));
                                                else ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "true", "token": token })));
                                            });
                                        } else {
                                            ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "Authentication Failed" })));
                                        }
                                    }
                                });
                            });
                        }).catch(console.warn);

                        break;
                    case "check":  // check jwt tocken

                        // //decode token, get user ID 
                        try {
                            var decodede = jwt.decode(request.token, { complete: true });
                        } catch (err) {
                            console.log("[AMQP]-"+workername + " " + err)
                        }

                        msgtosend = { "client": workername, "query": "auth", "hash": "1", "id": decodede.payload.id }

                        ch.sendToQueue(workerBackQueue, Buffer.from(JSON.stringify(msgtosend)), { replyTo: workername });

                        await open.then(function (conn) {
                            return conn.createChannel();
                        }).then(function (ch2) {
                            ch2.prefetch(1);
                            return ch2.assertQueue(workername).then(function (ok) {
                                return ch2.consume(workername, function (workerResp) {
                                    if (workerResp !== null) {
                                        ch2.ack(workerResp);
                                        ch2.close(function () { conn.close() })

                                        workerResult = JSON.parse(workerResp.content);

                                        if (workerResult.response == "true") {
                                            jwt.verify(request.token, workerResult.hash.toString(), (err, decoded) => {
                                                if (err) ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg-check": err.message })));
                                                else ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "success", "decoded": decoded })));
                                            });
                                        } else {
                                            ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "Error checking token" })));
                                        }
                                    }
                                });
                            });
                        }).catch(console.warn);
                        break;
                    default:
                        console.log("wrong query");
                        break;
                }
                ch.ack(msg);
                console.log("[AMQP]-"+workername + " " + Date.now().toString() + " - Done processing request!");
            }, { noAck: false });
        });
    });

}

start();