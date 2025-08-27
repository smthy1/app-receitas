import { createClient } from "redis";
import 'dotenv/config';

const password = process.env.REDIS_PASSWORD as string;

export const redis = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    },
    password: password!
});

await redis.connect();

redis.on("error", (err) => console.error("Redis error: ", err));