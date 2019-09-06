import { Injectable, Inject } from '@nestjs/common';
import { CommentInterface } from '../interfaces/comment.interface';
import { CommentDBServiceInterface } from '../interfaces/comment.db.service.interface';
import { strict } from 'assert';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CommentsDBService')
    protected commentsDbService: CommentDBServiceInterface,
  ) {}

  async create(ideaId: string, comment: CommentInterface) {
    comment.ideaId = ideaId;
    this.commentsDbService.saveComment(comment);
  }

  getByIdea(ideaId: string): Promise<CommentInterface[]> {
    return this.commentsDbService.getByCriteria({ ideaId });
  }
}
