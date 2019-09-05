import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }

  set id(id: string) {
    this._id = id as any;
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
