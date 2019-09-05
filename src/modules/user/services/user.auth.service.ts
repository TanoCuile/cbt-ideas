import { Injectable, Inject } from '@nestjs/common';
import { UserDBServiceInterface } from '../interfaces/user.db.service.interface';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject('UsersDBService')
    protected userDbService: UserDBServiceInterface,
  ) {}

  isValidWith(userToken: string): boolean {
    const token = userToken
    const user = this.userDbService.getByCriteria({ token });
    return !!user;
  }
}
