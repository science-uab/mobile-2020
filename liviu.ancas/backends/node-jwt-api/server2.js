'use strict'

const express = require('express');
const Prometheus = require('prom-client');
const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672?heartbeat=60';
const amqp = require('amqplib/callback_api');

const app = express();
const port = process.env.PORT || 3001
const metricsInterval = Prometheus.collectDefaultMetrics();
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'path', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})
const queryTotal = new Prometheus.Counter({
    name: 'rabbitmq_query',
    help: 'Total number of rabbitmq query',
    labelNames: ['rabbitmq_query']
})

var channel = null;
var backQueue = 'backrequest'
var producerName = "prod01"

startMq();

// Runs before each requests --- to count response
app.use((req, res, next) => {
    res.locals.startEpoch = Date.now()
    next()
})

app.get('/', async (req, res, next) => {
    queryTotal.inc({
        rabbitmq_query: "items"
    })

    var msgtosend = { client: "prod1", query: "items", nume: "apa", detalii: "apa", category: "4", limit: "10", active: "1" };   // items request based on nume or detalii items with limit or without limit

    queryMq(msgtosend, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType)
    res.end(Prometheus.register.metrics())
})

// Error handler
app.use((err, req, res, next) => {
    res.statusCode = 500
    // Do not expose your error in production
    res.json({ error: err.message })
    next()
})

// Runs after each requests
app.use((req, res, next) => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch

    httpRequestDurationMicroseconds
        .labels(req.method, req.path, res.statusCode)
        .observe(responseTimeInMs)
    next()
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
    clearInterval(metricsInterval)

    server.close((err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        process.exit(0)
    })
})

const queryMq = async (msg,fn) => {

    channel.sendToQueue(backQueue, Buffer.from(JSON.stringify(msg)), { persistent: true, replyTo: producerName });

    channel.prefetch(1);
    await channel.consume(producerName, resp => {
        channel.close(function() {conn.close()})
        // console.log(JSON.parse(resp.content.toString()));
        ch.ack(resp);
        ch.close(function () { conn.close() })
        fn(resp);
    }, {noAck: false })
    // 
}

async function startMq() {
    await amqp.connect(CONN_URL, async function (err, conn) {

        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(startMq, 1000);
        }

        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });

        conn.on("close", function () {
            console.error("[AMQP] reconnecting");
            return setTimeout(startMq, 1000);
        });

        await conn.createChannel(function (err, ch) {

            ch.on("error", function (err) {
                console.error("[AMQP] channel error", err.message);
            });
            ch.on("close", function () {
                console.log("[AMQP] channel closed");
            });


            ch.assertQueue(backQueue, {
                durable: true
            });

            ch.assertQueue(producerName, {
                durable: true
            });
            console.log("[AMQP] connected");

            ch.purgeQueue(producerName);
            channel = ch;

        });
    });

}
