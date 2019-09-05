import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }

  @Column()
  name: string;

  @Column()
  tocken: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  company: string;
}
