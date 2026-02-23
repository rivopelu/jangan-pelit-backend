import { db } from "../database/database";
import { AccountEntity } from "../entities/account.entity";
import { and, eq } from "drizzle-orm";

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
}
