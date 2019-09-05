import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UsersDBService {
  constructor(@Inject('USERS_REPOSITORY') protected usersRepository: Repository<User>) {}

  create(idea: User): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(idea));
  }

  find(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByIdAndUpdate(id: string, payload: Idea): Promise<User> {
    if (payload._id) {
      return this.usersRepository.save(payload);
    }

    const idea = await this.findById(id);
    return this.usersRepository.save(Object.assign({}, idea, payload));
  }

  async findById(id: string): Promise<User> {
    return (await this.usersRepository.findByIds([id]))[0];
  }
}
