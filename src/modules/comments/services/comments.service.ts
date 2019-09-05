import { Injectable } from '@nestjs/common';
import { Comment } from '../interfaces/comment.interface';

@Injectable()
export class CommentsService {
  private readonly comments: Comment[] = [];

  create(postId: string, comment: Comment) {
    this.comments.push(comment);

    return comment;
  }

  getByPost(postId: string): Comment[] {
    return [];
  }
}