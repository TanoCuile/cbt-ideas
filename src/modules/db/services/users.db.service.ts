import { Repository, In } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Idea } from '../models/idea.model';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserDBServiceInterface } from '../../user/interfaces/user.db.service.interface';

@Injectable()
export class UsersDBService implements UserDBServiceInterface {
  constructor(
    @Inject('USERS_REPOSITORY') protected usersRepository: Repository<User>,
  ) {}

  create(idea: User): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(idea));
  }

  find(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getByCriteria(
    criteria: { [key in keyof User]?: any },
  ): Promise<User[]> {
    if (criteria.id) {
      if (Array.isArray(criteria.id)) {
        criteria._id = { $in: criteria.id.map((id) => new ObjectID(id)) };
      } else {
        criteria._id = new ObjectID(criteria.id);
      }
      delete criteria.id;
    }

    const where = {
      $and: Object.keys(criteria).map(key => ({ [key]: criteria[key] })),
    };

    const result = await this.usersRepository.find({
      where,
    });

    return result;
  }

  async findByIdAndUpdate(id: string, payload: Idea): Promise<User> {
    if (payload._id) {
      return this.usersRepository.save(payload);
    }

    const idea = await this.findById(id);
    return this.usersRepository.save(Object.assign({}, idea, payload));
  }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { _id: String(id).length > 10 ? new ObjectID(id) : id },
    });
  }
}
