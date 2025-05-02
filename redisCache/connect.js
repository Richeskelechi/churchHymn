// redis.js
const Redis = require('ioredis');

// Create a new Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (error) => {
  console.error('Redis error:', error);
});

module.exports = redis;
