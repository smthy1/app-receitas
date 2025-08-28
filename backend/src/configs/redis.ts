import { createClient } from "redis";
import 'dotenv/config';

const password = process.env.REDIS_PASSWORD as string;
const host = process.env.REDIS_HOST as string;
const port = process.env.REDIS_PORT as unknown;

export const redis = createClient({
    socket: {
        host: host,
        port: port as number
    },
    password: password
});

await redis.connect();

redis.on("error", (err) => console.error("Redis error: ", err));