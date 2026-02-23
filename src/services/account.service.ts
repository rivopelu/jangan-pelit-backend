import type { Account } from "../entities/account.entity";
import AccountRepository from "../repositories/account.repository";
import type { IResAccountData } from "../types/response/IResAccountData";

export default class AccountService {
  private accountRepository: AccountRepository = new AccountRepository();

  public async getAccountDataById(
    id: string,
  ): Promise<IResAccountData | undefined> {
    const data = await this.accountRepository.findById(id);
    if (!data) return undefined;
    return this.getAccountData(data);
  }

  public getAccountData(account: Account): IResAccountData {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      profile_picture: account.profile_picture,
      username: account.username,
      role: account.role,
    };
  }
}
