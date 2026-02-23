import type { Context } from "hono";
import type { IReqSignUp } from "../types/request/IReqSignUp";
import { Controller, Middleware, Post } from "hono-decorators";
import { ValidationSignUp } from "../validation/validation-sign-up";
import { validate } from "../lib/validator";
import { validationSignIn } from "../validation/validation-sign-in";
import AuthService from "../services/auth.service";

@Controller("/auth")
export class AuthController {
  private authService = new AuthService();

  @Post("/sign-up")
  @Middleware([validate(ValidationSignUp)])
  async signUp(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    await this.authService.createNewAccount(body);
    return c.json(body);
  }

  @Post("/sign-in")
  @Middleware([validate(validationSignIn)])
  async signIn(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    return c.json(body);
  }
}
