import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Injectable, Inject } from '@nestjs/common';
import { Comment } from '../models/comment.model';
import { CommentDBServiceInterface } from '../../comments/interfaces/comment.db.service.interface';
import { CommentInterface } from '../../comments/interfaces/comment.interface';

@Injectable()
export class CommentsDBService implements CommentDBServiceInterface {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    protected commentsRepository: Repository<Comment>,
  ) {}

  getByCriteria(
    criteria: { [key in keyof Comment]?: any },
  ): Promise<Comment[]> {
    return this.commentsRepository.find({ where: criteria });
  }

  saveComment(comment: Comment): Promise<Comment> {
    if (comment.id) {
      return this.findByIdAndUpdate(comment.id, comment);
    }

    return this.create(comment);
  }

  create(idea: Comment): Promise<Comment> {
    return this.commentsRepository.save(this.commentsRepository.create(idea));
  }

  find(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  async findByIdAndUpdate(id: string, payload: Comment): Promise<Comment> {
    if (payload._id) {
      return this.commentsRepository.save(payload);
    }

    const idea = await this.findById(id);
    return this.commentsRepository.save(Object.assign({}, idea, payload));
  }

  async findById(id: string): Promise<Comment> {
    return await this.commentsRepository.findOne({
      where: { _id: String(id).length > 10 ? new ObjectID(id) : id },
    });
  }
}
