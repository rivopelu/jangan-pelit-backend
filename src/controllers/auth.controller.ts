import type { Context } from "hono";
import type { IReqSignUp } from "../types/request/IReqSignUp";
import { Controller, Post, Middleware } from "hono-decorators";
import { ValidationSignUp } from "../validation/validation-sign-up";
import { validate } from "../lib/validator";

@Controller("/auth")
export class AuthController {
  @Post("/sign-up")
  @Middleware([validate(ValidationSignUp)])
  async signUp(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    return c.json(body);
  }

  @Post("/sign-in")
  @Middleware([validate(ValidationSignUp)])
  async signIn(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    return c.json(body);
  }
}
