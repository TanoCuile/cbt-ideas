import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

import { IdeaInterface } from '../../ideas/interfaces/idea.interface';

@Entity()
export class Idea implements IdeaInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;

  @Column()
  owner: string;

  @Column()
  userlikes: number;

  @Column()
  userDislikes: number;
}
