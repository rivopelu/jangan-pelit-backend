import { db } from "../database/database";
import {
  type Account,
  AccountEntity,
  type NewAccount,
} from "../entities/account.entity";
import { and, desc, eq } from "drizzle-orm";
import type {
  IPaginationParams,
  IPaginationQuery,
} from "../types/type/IPaginationParams";

export default class AccountRepository {
  async existByUsername(username: string): Promise<boolean> {
    const data = await db
      .select({ id: AccountEntity.id })
      .from(AccountEntity)
      .where(
        and(
          eq(AccountEntity.username, username),
          eq(AccountEntity.active, true),
        ),
      )
      .limit(1);
    return data.length > 0;
  }
  async existByEmail(email: string): Promise<boolean> {
    const data = await db
      .select({ id: AccountEntity.id })
      .from(AccountEntity)
      .where(
        and(eq(AccountEntity.email, email), eq(AccountEntity.active, true)),
      )
      .limit(1);

    return data.length > 0;
  }

  async findByEmail(email: string): Promise<Account> {
    const data = await db
      .select()
      .from(AccountEntity)
      .where(
        and(eq(AccountEntity.email, email), eq(AccountEntity.active, true)),
      )
      .limit(1);

    return data[0];
  }

  async save(account: NewAccount) {
    await db.insert(AccountEntity).values(account);
  }

  async findById(id: string) {
    const data = await db
      .select()
      .from(AccountEntity)
      .where(and(eq(AccountEntity.id, id), eq(AccountEntity.active, true)))
      .limit(1);

    return data[0];
  }

  async getListPagination(
    params: IPaginationParams,
  ): Promise<IPaginationQuery<Account>> {
    const conditions = [eq(AccountEntity.active, true)];

    const data = await db
      .select()
      .from(AccountEntity)
      .where(and(...conditions))
      .orderBy(desc(AccountEntity.created_date))
      .limit(params.size)
      .offset(params.page * params.size);

    const response: IPaginationQuery<Account> = {
      data: data,
      page: params.page,
      size: params.size,
      total_data: 10,
    };

    return new Promise((resolve) => resolve(response));
  }
}
