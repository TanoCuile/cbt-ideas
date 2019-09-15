import { Injectable, Inject } from '@nestjs/common';
import { Request } from 'express';
import { UserDBServiceInterface } from '../../user/interfaces/user.db.service.interface';
import { UserInterface } from '../../user/interfaces/user.interface';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('UsersDBService')
    protected userDbService: UserDBServiceInterface,
  ) {}

  async registerTMPUser(
    profile: any,
    accessToken?: string,
    refreshToken?: string,
  ) {
    return this.registerUser(profile, accessToken, refreshToken);
  }
  async registerUser(
    profile: any,
    accessToken?: string,
    refreshToken?: string,
  ) {
    return {};
  }

  async getUserFromRequest(
    request: Request,
  ): Promise<UserInterface | undefined> {
    const token = request.cookies.ct_tok;
    if (!token) {
      return;
    }

    return this.getUserByToken(token);
  }

  async isValidWith(userToken: string): Promise<boolean> {
    const user = await this.getUserByToken(userToken);
    return !!user;
  }

  async getUserByToken(userToken: string) {
    const users = await this.userDbService.getByCriteria({ token: userToken });
    return users[0];
  }
}
