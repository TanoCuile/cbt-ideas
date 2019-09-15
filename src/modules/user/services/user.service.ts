import { Injectable, Inject } from '@nestjs/common';
import { UserDBServiceInterface } from '../interfaces/user.db.service.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UsersDBService')
    protected userDbService: UserDBServiceInterface,
  ) {}

  async getUsersInfo(
    userIds: string[],
  ): Promise<Array<{ name: string; id: string }>> {
    return this.getInfoFromUserModels(
      await this.userDbService.getByCriteria({ id: userIds }),
    );
  }

  getInfoFromUserModels(
    users: UserInterface[],
  ): Array<{ name: string; id: string }> {
    return users.map(user => {
      return {
        id: user.id,
        name: user.name,
      };
    });
  }
}
