import type { Context } from "hono";
import { t } from "i18next";

export class PingController {
  ping(c: Context) {
    return c.json({ message: t("ping") });
  }
}
