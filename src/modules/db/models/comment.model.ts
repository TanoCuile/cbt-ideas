import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class Comment {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }

  @Column()
  message: string;

  @Column()
  ideaId: string;

  @Column()
  userId: string;

  @Column()
  mensionedUsers: string[];
}
