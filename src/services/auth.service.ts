import type { IReqSignUp } from "../types/request/IReqSignUp";
import AccountRepository from "../repositories/account.repository";
import { BadRequestException } from "../lib/exception";
import { t } from "i18next";
import { StringHelper } from "../helper/string-helper";
import type { NewAccount } from "../entities/account.entity";
import DateHelper from "../helper/date-helper";

export default class AuthService {
  private accountRepository = new AccountRepository();
  async createNewAccount(data: IReqSignUp) {
    const checkUsername = await this.accountRepository.existByUsername(
      data.username,
    );
    if (checkUsername) {
      throw new BadRequestException(t("error.username_already_exist"));
    }
    const checkEmail = await this.accountRepository.existByEmail(data.email);
    if (checkEmail) {
      throw new BadRequestException(t("error.email_already_exist"));
    }

    const encodedPassword = await Bun.password.hash(data.password);
    const profilePicture = StringHelper.generateProfilePicture(data.name);

    const newAccount: NewAccount = {
      email: data.email,
      password: encodedPassword,
      name: data.name,
      username: data.username,
      profile_picture: profilePicture,
      created_date: DateHelper.getEpochMs(),
      created_by: "SYSTEM",
    };

    await this.accountRepository.save(newAccount);
  }
}
