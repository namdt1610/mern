import { createClient } from 'redis'

const redisClient = createClient()

// redisClient.on() is an event listener that listens for an error event and logs the error to the console.
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err)
})
// This is an IIFE that connects to the Redis server when the application starts.
// IIFE stands for Immediately Invoked Function Expression. It is a JavaScript function that runs as soon as it is defined.
;(async () => {
    await redisClient.connect()
})()

export default redisClient
