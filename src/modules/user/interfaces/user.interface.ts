import { UserRolesEnum } from './user-roles.enum';

export interface UserInterface {
  id: string;
  name: string;
  token: string;
  email: string;
  role: UserRolesEnum;
  company: string;
}
