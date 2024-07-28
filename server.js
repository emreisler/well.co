const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;
const client = redis.createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});
app.use(bodyParser.text());

// Middleware to check if Redis client is ready
app.use((req, res, next) => {
    if (!client.isOpen) {
        return res.status(503).send('Redis client is not connected');
    }
    next();
});

// Connect to Redis and handle errors
client.connect().catch(console.error);

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Handler for POST /input
app.post('/input', async (req, res) => {

    //validate input is a non-empty string
    if (!req.body || typeof req.body !== 'string') {
        return res.status(400).send('Invalid input');
    }

    const key = req.body.trim();

    //if a mutex created for the key use it, create a new one otherwise
    const mutex = getMutexForKey(key);
    await mutex.runExclusive(async () => {
        try {
            //redis incr is atomic!!
            await client.incr(key);
            res.sendStatus(200);
        } catch (err) {
            console.error('Error handling POST /input:', err);
            res.sendStatus(500);
        }
    });
});

// Handler for GET /query
app.get('/query', async (req, res) => {
    //validate key is a non-empty string
    if (!req.query.key || typeof req.query.key !== 'string') {
        return res.status(400).send('Invalid key');
    }

    const key = req.query.key.trim();

    try {
        let count = await client.get(key);
        count = count ? parseInt(count) : 0;
        res.send(count.toString());
    } catch (err) {
        console.error('Error handling GET /query:', err);
        res.sendStatus(500);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
