import type { Context } from "hono";
import type { IReqSignUp } from "../types/request/IReqSignUp";
import { Controller, Middleware, Post } from "hono-decorators";
import { ValidationSignUp } from "../validation/validation-sign-up";
import { validate } from "../lib/validator";
import { validationSignIn } from "../validation/validation-sign-in";
import AuthService from "../services/auth.service";
import { responseHelper } from "../lib/response-helper";
import AccountService from "../services/account.service";
import type { IResSignIn } from "../types/response/IResSignIn";

@Controller("/auth")
export class AuthController {
  private authService = new AuthService();
  private accountService = new AccountService();

  @Post("/sign-up")
  @Middleware([validate(ValidationSignUp)])
  async signUp(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    await this.authService.createNewAccount(body);
    return c.json(responseHelper.success());
  }

  @Post("/sign-in")
  @Middleware([validate(validationSignIn)])
  async signIn(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    const data = await this.authService.verifySignIn(body);
    const accountData = this.accountService.getAccountData(data);
    const response: IResSignIn = {
      account: accountData,
      access_token: "123132",
    };
    return c.json(responseHelper.data(response));
  }
}
