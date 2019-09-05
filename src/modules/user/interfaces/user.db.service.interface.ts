import { UserInterface } from './user.interface';

export interface UserDBServiceInterface {
  getByCriteria(
    criteria: { [key in keyof UserInterface]?: any },
  ): Promise<UserInterface[]>;
}
