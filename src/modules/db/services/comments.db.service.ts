import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { Injectable, Inject } from '@nestjs/common';
import { Comment } from '../models/comment.model';

@Injectable()
export class UsersDBService {
  constructor(
    @Inject('Comments_REPOSITORY')
    protected commentsRepository: Repository<Comment>,
  ) {}

  create(idea: Comment): Promise<Comment> {
    return this.commentsRepository.save(this.commentsRepository.create(idea));
  }

  find(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  async findByIdAndUpdate(id: string, payload: Idea): Promise<Comment> {
    if (payload._id) {
      return this.commentsRepository.save(payload);
    }

    const idea = await this.findById(id);
    return this.commentsRepository.save(Object.assign({}, idea, payload));
  }

  async findById(id: string): Promise<Comment> {
    return (await this.commentsRepository.findByIds([id]))[0];
  }
}
