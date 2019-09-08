import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

import { IdeaInterface } from '../../ideas/interfaces/idea.interface';

@Entity({
  name: 'ideas'
})
export class Idea implements IdeaInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }

  set id(id: string) {
    this._id = id as any;
  }

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column()
  commentsCount: number;

  @Column()
  dislikes: number;

  @Column()
  owner: string;

  @Column()
  usersWhoLiked: string[];

  @Column()
  usersWhoDisliked: string[];
}
