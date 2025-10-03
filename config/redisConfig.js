import redis from 'redis';

// Create Redis client
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});

redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(console.error);

export default redisClient;