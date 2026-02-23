import { zValidator } from "@hono/zod-validator";
import type { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return zValidator("json", schema, (result, c) => {
    if (!result.success && "error" in result) {
      const firstError = result.error.issues[0];
      const errorKey = firstError?.message || "validation.failed";
      const translate = c.get("t");

      return c.json(
        {
          success: false,
          message: translate(errorKey),
        },
        400,
      );
    }
  });
};
