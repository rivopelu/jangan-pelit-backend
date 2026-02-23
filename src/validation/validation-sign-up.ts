import { z } from "zod";

export const ValidationSignUp = z.object({
  email: z.email({ message: "validation.invalid_email" }),
  password: z.string().min(6, { message: "validation.password_too_short" }),
  name: z.string().min(3, { message: "validation.name_too_short" }),
  username: z.string().min(3, { message: "validation.username_too_short" }),
});
