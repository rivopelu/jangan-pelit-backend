import { Hono } from "hono";
import i18next from "i18next";
import appRoutes from "../routes/_app.routes";
import loggerMiddleware from "./logger-middleware";
import corsConfig from "../configs/cors.config";

export default class InitMiddlewares {
  private app: Hono;

  constructor(app: Hono) {
    this.app = app;
    this.setupMiddlewares();
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

  private setupMiddlewares() {
    this.app.use("*", loggerMiddleware);
    this.app.use("*", corsConfig);
  }
}
