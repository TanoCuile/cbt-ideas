import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Idea } from '../models/idea.model';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UsersDBService {
  constructor(
    @Inject('USERS_REPOSITORY') protected usersRepository: Repository<User>,
  ) {}

  create(idea: User): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(idea));
  }

  find(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getByCriteria(
    criteria: { [key in keyof User]?: any },
  ): Promise<User[]> {
    return this.usersRepository.find({ where: criteria });
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
