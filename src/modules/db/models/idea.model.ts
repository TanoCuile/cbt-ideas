import { Entity, Column } from 'typeorm';

import { Base } from './base.model';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Idea extends Base {
  @Column()
  @ApiModelProperty()
  title: string;

  @Column()
  @ApiModelProperty()
  description: string;

  @Column()
  @ApiModelProperty()
  likes: number;

  @Column()
  @ApiModelProperty()
  dislikes: number;

  @Column()
  @ApiModelProperty()
  owner: string;

  @Column()
  @ApiModelProperty()
  users_who_liked: Array<string>;
  
  @Column()
  @ApiModelProperty()
  users_who_disliked: Array<string>;
}
