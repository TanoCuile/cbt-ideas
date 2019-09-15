import { Injectable, Inject } from '@nestjs/common';
import { CommentInterface } from '../interfaces/comment.interface';
import { CommentDBServiceInterface } from '../interfaces/comment.db.service.interface';
import { CommentResponseDTO } from '../dtos/comment-response.dto';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CommentsDBService')
    protected commentsDbService: CommentDBServiceInterface,
    @Inject('UserService') protected userService: UserService,
  ) {}

  async getResponseFromComments(comments: CommentInterface[]): Promise<CommentResponseDTO[]> {
    const users = (await this.userService.getUsersInfo(
      this.getUserIdsFromIdeas(comments),
    )).reduce(
      (total, user) => {
        total[user.id] = { name: user.name };
        return total;
      },
      {} as {
        [key: string]: {
          name: string;
        };
      },
    );

    const ideasResponse: CommentResponseDTO[] = comments.map(comment => {
      const id = comment.id;
      delete (comment as any)._id;
      return Object.assign({}, comment, {
        id,
        userName: users[comment.userId]
          ? users[comment.userId].name
          : 'John Doe',
      });
    });

    return ideasResponse;
  }

  getUserIdsFromIdeas(ideas: CommentInterface[]): string[] {
    return ideas.reduce(
      (prev, comment) => {
        if (prev.indexOf(comment.userId) < 0) {
          prev.push(comment.userId);
        }
        return prev;
      },
      [] as string[],
    );
  }

  create(ideaId: string, comment: CommentInterface) {
    comment.ideaId = ideaId;
    console.log('>', comment);
    return this.commentsDbService.saveComment(comment);
  }

  getByIdea(ideaId: string): Promise<CommentInterface[]> {
    return this.commentsDbService.getByCriteria({ ideaId });
  }
}
