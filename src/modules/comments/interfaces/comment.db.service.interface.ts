import { CommentInterface } from './comment.interface';

export interface CommentDBServiceInterface {
  getByCriteria(
    criteria: { [key in keyof CommentInterface]?: any },
  ): Promise<CommentInterface[]>;

  saveComment(comment: CommentInterface): Promise<CommentInterface>;
}
