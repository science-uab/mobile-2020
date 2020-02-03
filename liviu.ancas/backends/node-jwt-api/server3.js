'use strict'

const express = require('express');
const Prometheus = require('prom-client');
const CONN_URL = 'amqp://broker:broker@127.0.0.1:5672?heartbeat=60';

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

var backQueue = 'backrequest'
var authQueue = 'jtwrequest'
var workerName = "prod01"


var open = require('amqplib').connect(CONN_URL);


// Runs before each requests --- to count response
app.use((req, res, next) => {
    res.locals.startEpoch = Date.now()
    next()
})
// use express body parser
app.use(express.json());

app.get('/', async (req, res, next) => {
    res.json({ message: "wrong request" });
    next();
})
app.post('/', async (req, res, next) => {
    res.json({ message: "wrong request" });
    next();
})

// ---------------------------------------------//
// -------------------- ITEMS ------------------// 
// ---------------------------------------------//

app.get('/items', async (req, res, next) => {
    queryTotal.inc({
        rabbitmq_query: "items_all"
    })

    let msgtosend = { client: workerName, query: "items" };   // items request -all items (can add limits and active)

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });
})

app.post('/items', async (req, res, next) => {
    let msgtosend = { client: workerName };

    if (req.body != null) {

        msgtosend = {
            ...msgtosend,
            ...req.body
        }

        for (const [key] of Object.entries(req.body)) {
            queryTotal.inc({
                rabbitmq_query: "items_" + key
            })
        }
    } else {
        queryTotal.inc({
            rabbitmq_query: "items_all"
        })
    }

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });
})

// ---------------------------------------------//
// -------------------- USERS ------------------// 
// ---------------------------------------------//

app.get('/users', async (req, res, next) => {

    queryTotal.inc({
        rabbitmq_query: "users_all"
    })

    let msgtosend = { client: workerName, query: "users" };
    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

app.post('/users', async (req, res, next) => {

    let msgtosend = { client: workerName };

    if (req.body.id != null) {
        msgtosend.id = req.body.id;

        queryTotal.inc({
            rabbitmq_query: "user"
        })
    } else {
        queryTotal.inc({
            rabbitmq_query: "users_all"
        })
    }

    console.log(req.body);

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

// ---------------------------------------------//
// ------------------ CATEGORY -----------------// 
// ---------------------------------------------//

app.get('/category', async (req, res, next) => {

    queryTotal.inc({
        rabbitmq_query: "category_all"
    })

    let msgtosend = { client: workerName, query: "categorie" };
    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

app.post('/category', async (req, res, next) => {
    let msgtosend = { client: workerName };
    if (req.body != null) {

        msgtosend = {
            ...msgtosend,
            ...req.body
        }

        for (const [key] of Object.entries(req.body)) {
            queryTotal.inc({
                rabbitmq_query: "category_" + key
            })
        }
    } else {
        queryTotal.inc({
            rabbitmq_query: "category_all"
        })
    }

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})


// ---------------------------------------------//
// ------------------- OFERTE ------------------// 
// ---------------------------------------------//

app.get('/oferte', async (req, res, next) => {

    queryTotal.inc({
        rabbitmq_query: "oferte_all"
    })

    let msgtosend = { client: workerName, query: "oferta" };


    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})


// ---------------------------------------------//
// -------------------- MESE -------------------// 
// ---------------------------------------------//

app.get('/mese', async (req, res, next) => {

    queryTotal.inc({
        rabbitmq_query: "masa_all"
    })

    let msgtosend = { client: workerName, query: "masa" };
    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });
})

app.post('/mese', async (req, res, next) => {

    let msgtosend = { client: workerName };
    if (req.body != null) {

        msgtosend = {
            ...msgtosend,
            ...req.body
        }

        for (const [key] of Object.entries(req.body)) {
            queryTotal.inc({
                rabbitmq_query: "masa_" + key
            })
        }
    } else {
        queryTotal.inc({
            rabbitmq_query: "masa_all"
        })
    }

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });
})

// ---------------------------------------------//
// ------------------- COMENZI -----------------// 
// ---------------------------------------------//

app.get('/comanda', async (req, res, next) => {
    let msgtosend = { client: workerName, query: "comanda" };

    queryTotal.inc({
        rabbitmq_query: "comanda_all"
    })

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

app.post('/comanda', async (req, res, next) => {
    let msgtosend = { client: workerName };
    if (req.body != null) {

        msgtosend = {
            ...msgtosend,
            ...req.body
        }

        for (const [key] of Object.entries(req.body)) {
            queryTotal.inc({
                rabbitmq_query: "comanda_" + key
            })
        }
    } else {
        queryTotal.inc({
            rabbitmq_query: "comanda_all"
        })
    }

    queryMq(msgtosend, backQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

// ---------------------------------------------//
// ------------- AUTHENTICATION ----------------// 
// ---------------------------------------------//


app.post('/auth', async (req, res, next) => {


    let msgtosend = { client: workerName };
    if (req.body != null) {

        msgtosend = {
            ...msgtosend,
            ...req.body
        }

        // console.log(Object.entries(req.body)[0][1]);

        queryTotal.inc({
            rabbitmq_query: "auth_token_" + Object.entries(req.body)[0][1]
        })
    }

    queryMq(msgtosend, authQueue, (responseMq) => {
        res.json({ message: JSON.parse(responseMq.content.toString()) })
        next();
    });

})

// ---------------------------------------------//
// ------------------- METRICS -----------------// 
// ---------------------------------------------//

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

const queryMq = async (msg, chan, fn) => {

    open.then(function (conn) {
        return conn.createChannel();
    }).then(function (ch) {
        ch.assertQueue(workerName, {
            durable: true
        });
        ch.purgeQueue(workerName);
        return ch.assertQueue(chan).then(function (ok) {
            return ch.sendToQueue(chan, Buffer.from(JSON.stringify(msg)), { persistent: true, replyTo: workerName });
        });
    }).catch(console.warn);



    await open.then(function (conn) {
        return conn.createChannel();
    }).then(function (ch) {
        ch.prefetch(1);
        return ch.assertQueue(workerName).then(function (ok) {
            return ch.consume(workerName, function (msg) {
                if (msg !== null) {
                    // console.log(msg.content.toString());
                    ch.ack(msg);
                    ch.close(function () { conn.close() })
                    fn(msg);
                }
            });
        });
    }).catch(console.warn);
}


open.then(function (conn) {
    conn.on("close", function () {
        console.error("[AMQP] reconnecting");
        return setTimeout(open = require('amqplib').connect(CONN_URL), 1000);
    })
});