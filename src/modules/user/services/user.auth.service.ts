import { Injectable, Inject } from '@nestjs/common';
import { UserDBServiceInterface } from '../interfaces/user.db.service.interface';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('UsersDBService')
    protected userDbService: UserDBServiceInterface,
  ) {}

  async isValidWith(userToken: string): Promise<boolean> {
    return !!(await this.getUserByToken(userToken));
  }

  private async getUserByToken(userToken: string) {
    return await this.userDbService.getByCriteria({ token: userToken })[0];
  }
}
