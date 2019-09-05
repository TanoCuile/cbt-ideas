import { Entity, Column } from 'typeorm';

import { Base } from './base.model';
import { IdeaInterface } from '../../ideas/interfaces/idea.interface';

@Entity()
export class Idea extends Base implements IdeaInterface {
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
  users_who_liked: Array<string>;
  
  @Column()
  users_who_disliked: Array<string>;
}
