import { Hono } from "hono";
import { env } from "./configs/env";
import i18nConfig from "./configs/i18n.config";
import InitMiddlewares from "./lib/midlewares";
import logger from "./configs/logger";

const app = new Hono();
const port = env.PORT || 8080;

new InitMiddlewares(app);

app.get("/", (c) => {
  const t = c.get("t");
  return c.json({ message: t("welcome") });
});

async function bootstrap() {
  try {
    await i18nConfig();

    // Jalankan server manual
    const server = Bun.serve({
      fetch: app.fetch,
      port: port,
    });

    process.stdout.write("\u001b[2J\u001b[0;0H");

    logger.info("🌍 I18n initialized successfully");
    logger.info(`🔥 API initialized on ${server.url}`);
  } catch (error: any) {
    logger.error(`❌ Gagal: ${error.message}`);
    process.exit(1);
  }
}

bootstrap().then();

export { app };
