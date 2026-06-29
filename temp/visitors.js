import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

    let visitors = await redis.get("visitors");

    if (!visitors) {
        visitors = 0;
    }

    visitors = Number(visitors) + 1;

    await redis.set("visitors", visitors);

    res.status(200).json({
        visitors
    });

}