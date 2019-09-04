import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class Idea {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  deacrition: string;
}
