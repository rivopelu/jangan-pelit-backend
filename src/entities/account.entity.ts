import { pgTable, varchar } from "drizzle-orm/pg-core";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { baseEntity, entityId } from "../database/base-entity";

export type AccountRoleType = "USER" | "ADMIN";
export type AccountStatusType = "ACTIVE" | "INACTIVE";

export const AccountEntity = pgTable("account", {
  ...entityId,
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  sign_up_type: varchar("sign_up_type", { length: 50 })
    .default("EMAIL")
    .$type<"EMAIL" | "GOOGLE">()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  profile_picture: varchar("profile_picture", { length: 500 }),
  role: varchar("role", { length: 50 })
    .default("USER")
    .$type<AccountRoleType>()
    .notNull(),
  status: varchar("status", { length: 50 })
    .default("ACTIVE")
    .$type<AccountStatusType>()
    .notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  ...baseEntity,
});

export type Account = InferSelectModel<typeof AccountEntity>;
export type NewAccount = InferInsertModel<typeof AccountEntity>;
