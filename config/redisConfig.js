const Redis = require('ioredis');
require('dotenv').config({ path: 'secure.env' });

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

module.exports = redis;