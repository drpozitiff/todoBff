const Redis = require("redis");

const redisConf = {
    host: 'redis-11171.c247.eu-west-1-1.ec2.cloud.redislabs.com',
    port: '11171',
    password: 'todoapp123'
};

const redisClient = Redis.createClient(redisConf);
redisClient.on("error", function (error) {
    console.error("Error enc: ",error);
});
redisClient.on("connect", function (err){
    console.log("Redis Connection Established", !err ? "with no errors" : err);
});
module.exports = redisClient;