import { Hono } from "hono";
import pingRoutes from "./ping.routes";
import authRoutes from "./auth.routes";

const appRoutes = new Hono();

appRoutes.route("/ping", pingRoutes);
appRoutes.route("/auth", authRoutes);

export default appRoutes;
