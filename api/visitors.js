import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    let visitors = await redis.get("visitors");

    if (!visitors) {
      visitors = 0;
    }

    visitors = Number(visitors) + 1;

    await redis.set("visitors", visitors);

    return res.status(200).json({
      visitors,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}