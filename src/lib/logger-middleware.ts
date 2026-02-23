import type { Context, Next } from "hono";
import logger from "../configs/logger";

const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  await next();

  const duration = Date.now() - start;
  const req = c.req;
  const res = c.res;

  logger.info(
    `[${req.method}] ${req.url} - Status: ${res.status} - ${duration}ms`,
  );
};

export default loggerMiddleware;
