import { ObjectIdColumn, ObjectID } from "typeorm";

export abstract class Base {
  @ObjectIdColumn()
  _id: ObjectID;

  get id(): string | undefined {
    return this._id.toString();
  }
}