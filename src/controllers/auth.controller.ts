import type { Context } from "hono";
import type { IReqSignUp } from "../types/request/IReqSignUp";
import { Controller, Get, Middleware, Post } from "hono-decorators";
import { ValidationSignUp } from "../validation/validation-sign-up";
import { validate } from "../lib/validator";
import { validationSignIn } from "../validation/validation-sign-in";
import AuthService from "../services/auth.service";
import { responseHelper } from "../lib/response-helper";
import AccountService from "../services/account.service";
import type { IResSignIn } from "../types/response/IResSignIn";
import jwtMiddleware from "../middlewares/jwt-middleware";
import { getAccountId } from "../lib/utils";

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
    const accessToken = await this.authService.generateToken({
      email: data.email,
      role: data.role,
      id: data.id,
    });
    const response: IResSignIn = {
      account: accountData,
      access_token: accessToken,
    };
    return c.json(responseHelper.data(response));
  }

  @Get("/me")
  @Middleware([jwtMiddleware])
  async getMe(c: Context) {
    const accountId = getAccountId(c);
    const accountData = await this.accountService.getAccountDataById(accountId);
    return c.json(responseHelper.data(accountData));
  }
}
