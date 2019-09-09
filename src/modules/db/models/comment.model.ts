import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn } from 'typeorm';
import { CommentInterface } from '../../comments/interfaces/comment.interface';

@Entity({
  name: 'comments',
})
export class Comment implements CommentInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id ? this._id.toString() : undefined;
  }

  set id(id: string) {
    this._id = id as any;
  }

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  message: string;

  @Column()
  ideaId: string;

  @Column()
  userId: string;

  @Column()
  mentionedUsers: string[];

  @Column()
  parentCommentId: string;
}
