import type { Context, Next } from "hono";
import logger from "../configs/logger";

const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();

  await next();

  const duration = Date.now() - start;

  const method = c.req.method;
  const url = c.req.url;
  const status = c.res ? c.res.status : "Unknown";

  logger.info(`[${method}] ${url} - Status: ${status} - ${duration}ms`);
};

export default loggerMiddleware;
