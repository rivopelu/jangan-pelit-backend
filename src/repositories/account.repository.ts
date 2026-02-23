import { db } from "../database/database";
import { AccountEntity, type NewAccount } from "../entities/account.entity";
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

  async save(account: NewAccount) {
    await db.insert(AccountEntity).values(account);
  }
}
