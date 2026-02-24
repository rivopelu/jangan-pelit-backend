import { Hono } from "hono";
import pingRoutes from "./ping.routes";
import { registerControllers } from "hono-decorators";
import { AuthController } from "../controllers/auth.controller";
import AccountController from "../controllers/account.controller";

const appRoutes = new Hono();

appRoutes.route("/ping", pingRoutes);
registerControllers([AuthController, AccountController], appRoutes);

export default appRoutes;
