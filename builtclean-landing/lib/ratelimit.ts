import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const configured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = configured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const PASS = { success: true, remaining: 99, limit: 99, reset: 0, pending: Promise.resolve() };

function makeLimiter(limiter: ConstructorParameters<typeof Ratelimit>[0]["limiter"], prefix: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  if (!redis) return { limit: async (_id: string) => PASS };
  return new Ratelimit({ redis, limiter, prefix });
}

// 3 requests per 60 seconds per IP (burst protection)
export const demoBurst = makeLimiter(Ratelimit.slidingWindow(3, "60 s"), "demo:burst");

// 10 requests per day per IP (daily cap)
export const demoDaily = makeLimiter(Ratelimit.slidingWindow(10, "24 h"), "demo:daily");

export function getIp(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "anonymous"
  );
}
