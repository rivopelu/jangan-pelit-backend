import { Controller, Get, Middleware } from "hono-decorators";
import type { Context } from "hono";
import { responseHelper } from "../lib/response-helper";
import adminMiddleware from "../middlewares/admin-middleware";
import { getPaginationParam } from "../lib/utils";
import AccountRepository from "../repositories/account.repository";
import type { IResAccountListAdmin } from "../types/response/IResAccountListAdmin";

@Controller("/account")
export default class AccountController {
  private accountRepository = new AccountRepository();
  @Get("/admin/list")
  @Middleware([adminMiddleware])
  async getAccountListAdmin(c: Context) {
    const paginationParam = getPaginationParam(c);
    const data =
      await this.accountRepository.getListPagination(paginationParam);
    const parseData: IResAccountListAdmin[] = data.data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        email: e.email,
        username: e.username,
        role: e.role,
        profile_picture: e.profile_picture,
        created_date: e.created_date,
      };
    });
    return c.json(
      responseHelper.paginated<IResAccountListAdmin[]>(parseData, {
        page: data.page,
        totalData: data.total_data,
        size: data.size,
      }),
    );
  }
}
