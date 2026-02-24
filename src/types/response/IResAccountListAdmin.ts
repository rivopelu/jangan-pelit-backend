import type { AccountRoleType } from "../../entities/account.entity";

export interface IResAccountListAdmin {
  name: string;
  id: string;
  role: AccountRoleType;
  email: string;
  profile_picture: string;
  created_date: number;
}
