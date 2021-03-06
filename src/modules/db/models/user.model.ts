import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { UserRolesEnum } from '../../user/interfaces/user-roles.enum';

@Entity({
  name: 'users',
})
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }

  set id(id: string) {
    this._id = id as any;
  }

  @Column()
  name: string;

  @Column()
  token: string;

  @Column()
  email: string;

  @Column()
  role: UserRolesEnum;

  @Column()
  company: string;
}
