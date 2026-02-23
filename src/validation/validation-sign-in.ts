import { z } from "zod";

export const validationSignIn = z.object({
  email: z.email({ message: "validation.invalid_email" }),
  password: z.string().min(6, { message: "validation.password_too_short" }),
});
