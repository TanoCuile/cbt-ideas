import { Injectable, Inject } from '@nestjs/common';
import { UserDBServiceInterface } from '../interfaces/user.db.service.interface';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('UsersDBService')
    protected userDbService: UserDBServiceInterface,
  ) {}

  async isValidWith(userToken: string): Promise<boolean> {
    const token = userToken
    const user = await this.userDbService.getByCriteria({ token });
    return !!user.length;
  }
}
