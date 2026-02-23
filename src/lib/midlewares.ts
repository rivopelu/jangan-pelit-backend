import type { Hono } from "hono";
import i18next from "i18next";

export default class InitMiddlewares {
  constructor(app: Hono) {
    app.use("*", async (c, next) => {
      c.set("t", i18next.t);
      await next();
    });
  }
}
