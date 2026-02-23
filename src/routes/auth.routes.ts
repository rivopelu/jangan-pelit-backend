import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";
import { zValidator } from "@hono/zod-validator";
import { ValidationSignUp } from "../validation/validation-sign-up";
import { t } from "i18next";
import { validate } from "../lib/validator";

const authRoutes = new Hono();
const authController = new AuthController();

authRoutes.post(
  "/sign-up",
  validate(ValidationSignUp),
  authController.signUp.bind(authController),
);

export default authRoutes;
