import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { CommentInterface } from '../../comments/interfaces/comment.interface';

@Entity({
  name: 'comments',
})
export class Comment implements CommentInterface {
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
