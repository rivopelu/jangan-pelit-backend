import { Hono } from "hono";
import { env } from "./configs/env";
import i18nConfig from "./configs/i18n.config";
import InitMiddlewares from "./lib/midlewares";

i18nConfig().then();
const app = new Hono();
new InitMiddlewares(app);

app.get("/", (c) => {
  const t = c.get("t");
  return c.json({ message: t("welcome") });
});

export default {
  port: env.PORT,
  fetch: app.fetch,
};
