import { Hono } from "hono";
import i18next from "i18next";
import appRoutes from "../routes/_app.routes";

export default class InitMiddlewares {
  private app: Hono;

  constructor(app: Hono) {
    this.app = app;
    this.setupInternationalization();
    this.setupRoutes();
  }

  private setupInternationalization() {
    this.app.use("*", async (c, next) => {
      c.set("t", i18next.t.bind(i18next));
      await next();
    });
  }

  private setupRoutes() {
    this.app.route("/api", appRoutes);
  }
}
