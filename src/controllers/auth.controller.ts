import type { Context } from "hono";
import type { IReqSignUp } from "../types/request/IReqSignUp";

export class AuthController {
  async signUp(c: Context) {
    const body: IReqSignUp = await c.req.json<IReqSignUp>();
    return c.json(body);
  }
}
