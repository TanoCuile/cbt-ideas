import { Injectable, Inject } from '@nestjs/common';
import { Request } from 'express';
import { UserDBServiceInterface } from '../interfaces/user.db.service.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('UsersDBService')
    protected userDbService: UserDBServiceInterface,
  ) {}

  async getUserFromRequest(
    request: Request,
  ): Promise<UserInterface | undefined> {
    const token = request.cookies.ct_tok;
    if (!token) {
      return;
    }

    return this.getUserByToken(token);
  }

  async getUsersInfo(
    userIds: string[],
  ): Promise<Array<{ name: string; id: string }>> {
    const user = await this.userDbService.getByCriteria({ id: userIds });
    console.log(user);
    return this.getUserInfo(
      await this.userDbService.getByCriteria({ id: userIds }),
    );
  }

  getUserInfo(users: UserInterface[]): Array<{ name: string; id: string }> {
    return users.map(user => {
      return {
        id: user.id,
        name: user.name,
      };
    });
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
