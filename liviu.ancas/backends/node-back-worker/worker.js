const amqp = require('amqplib/callback_api');
const mysql = require('mysql');
var sqlQuery = require('./sqlQuery');
const stringHash = require("string-hash");
var bcrypt = require('bcryptjs');
var validator = require('validator');

// to be updated from env vars
//const workername = "back01"
const workerBackQueue = "backrequest";
const workername = process.env.WORKERNAME;
const sqlpassword = process.env.SQLPASSWORD;
const sqlusername = process.env.SQLUSERNAME;
const sqlhostname = process.env.SQLHOSTNAME;
const sqlport = process.env.SQLPORT;
const sqldatabase = process.env.SQLDB;
const mqUser = process.env.RABBITMQUSER;
const mqPass = process.env.RABBITMQPASS;
const mqHost = process.env.RABBITMQHOST;
const mqPort = process.env.RABBITMQPORT;

// amqp://mqUser:mqPass@mqHost:mqPort?heartbeat=60
// password: "phpRandomPasswordAPI",
// user: "php_api",
// database: "firmaX",
// host: "192.168.1.150",
// port: "3307"


// to be updated from env vars
const mysqlpool = mysql.createPool({
    connectionLimit: 20,
    password: sqlpassword,
    user: sqlusername,
    database: sqldatabase,
    host: sqlhostname,
    port: sqlport
});




function start() {

    const CONN_URL = 'amqp://'+mqUser+':'+mqPass+'@'+mqHost+':'+mqPort+'?heartbeat=60';
    // const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672?heartbeat=60';

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

        console.log(" " + Date.now().toString() + " - [AMQP]-"+workername +" connected");

        conn.createChannel(function (err, ch) {

            if (closeOnErr(err)) return;

            ch.on("error", function (err) {
                console.error("[AMQP]-"+workername +" channel error", err.message);
            });
            ch.on("close", function () {
                console.log("[AMQP]-"+workername +" channel closed");
            });

            // all request come here - main listen channel
            ch.assertQueue(workerBackQueue, {
                durable: true
            });

            // used for responses directed to backend
            ch.assertQueue(workername, {
                durable: true
            });

            ch.purgeQueue(workername);  // purge own RPC queue
            ch.prefetch(1);             // fetch only 1 msg at a time
            ch.consume(workerBackQueue, function (msg) {

                request = JSON.parse(msg.content);
                console.log("[AMQP]-"+workername + " " + Date.now().toString() + " - Processing request - " + JSON.stringify(request) + " !");
                if (request.query != null) {


                    switch (request.query) {
                        // ------------------- ITEMS QUERY ------------------------ //
                        case "items":
                            //query sql based on request
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;

                                    let mysqlQuery = sqlQuery.items(request);

                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)));
                                    });
                                    connection.release();
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername + " : " +error);
                            }
                            break;
                        // ------------------- CATEG QUERY ------------------------ //
                        case "categorie":
                            //query sql based on request (username and password)
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.category(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)));
                                    });
                                    connection.release();
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : " +error);
                            }
                            break;
                        // ------------------- OFERTA QUERY ------------------------ //
                        case "oferta":
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.oferta(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)));
                                    });
                                    connection.release();
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : "+error);
                            }
                            break;
                        // ------------------- MASA QUERY ------------------------ //
                        case "masa":
                            // si lista si rezervate
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.masa(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        // result.forEach(function (elem) {
                                        //     ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": elem })));
                                        // });
                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)));
                                    });
                                    connection.release();
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : "+error);
                            }
                            break;
                        // ------------------- COMANDA QUERY ------------------------ //
                        case "comanda":
                            // si active si finalizate
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.comanda(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)));
                                    });
                                    connection.release();
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : "+error);
                            }
                            break;
                        // ------------------- USERS QUERY ------------------------ //
                        case "users":
                            //query sql based on request
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.users(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)));
                                    });
                                    connection.release();
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : "+error);
                            }
                            break;
                        // ------------------- AUTH QUERY ------------------------ //
                        case "auth":
                            //query sql based on request (username and password)
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.auth(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        // parse sql result to object

                                        if (result == "") {
                                            ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "Auth Failed!" }))); // response false
                                        } else {

                                            const parsedResult = JSON.parse(JSON.stringify(result[0]));

                                            // if we have a hash request
                                            if (request.hash != null) {
                                                let hashed = stringHash(parsedResult.password + parsedResult.username + parsedResult.activ_user + parsedResult.access_lvl);
                                                parsedResult.password = hashed;
                                                ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "true", "hash": hashed, id: parsedResult.id }))); // response true
                                            }
                                            // check if user and password are provided
                                            else if (request.user != null || request.pass != null) {
                                                // compare password - in db is bcrypted
                                                bcrypt.compare(request.pass, parsedResult.password, function (err, doesMatch) {
                                                    if (err) console.log("[AMQP]-"+workername + ": Password bcrypt compare error");
                                                    if (doesMatch) {
                                                        // create a hash with user password+username+activ_user+access_lvl, if any of this change hass is different
                                                        // this hash is used to generate jwt token, this way we can invalidate a token fast based on all above
                                                        let hashed = stringHash(parsedResult.password + parsedResult.username + parsedResult.activ_user + parsedResult.access_lvl);
                                                        parsedResult.password = hashed;

                                                        // send response
                                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "true", "hash": hashed, id: parsedResult.id }))); // response true
                                                    } else {
                                                        ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "Auth Failed!" }))); // response false
                                                    }
                                                });
                                            } else { // if no user and password provided
                                                ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "No user or password provided" }))); // response false if no user provided
                                            }
                                        }
                                    });
                                    connection.release(); // close db con
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : " +error);
                            }
                            break;
                        default:
                            ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "wrong query" }))); // response false if no user provided
                            break;
                    };
                }
                // inserts
                else if (request.insert != null) {
                    switch (request.insert) {
                        case "item":
                            console.log("add item");
                            try {
                                mysqlpool.getConnection(function wait(err, connection) {
                                    if (err) throw err;
                                    let mysqlQuery = sqlQuery.insertItem(request);
                                    mysqlpool.query(mysqlQuery, function wait(err, result) {
                                        if (err) throw err;
                                        // parse sql result to object
                                        console.log(JSON.stringify(result));
                                    });
                                    connection.release(); // close db con
                                });
                            } catch (error) {
                                console.log("[AMQP]-"+workername +" : "+error);
                            }
                            break;
                        case "comanda":
                            console.log("add comanda");
                            break;
                        default:
                            console.log("error default switchcase - unknown request");
                            break;
                    }
                }
                // updates
                else if (request.update != null) {
                    switch (request.update) {
                        case "item":
                            console.log("update item");
                            break;
                        case "comanda":
                            console.log("update comanda");
                            break;
                        default:
                            console.log("error default switchcase - unknown request");
                            break;
                    }
                } else {
                    ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ "response": "false", "msg": "wrong api call" }))); // response false if no user provided
                }
                ch.ack(msg);
                console.log(workername + " " + Date.now().toString() + " - Done processing request!");
            }, { noAck: false }  // nu face auto acknoledge la mesaje
            );
        });
    });
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP]-"+workername, err);
    amqpConn.close();
    return true;
}

start();
