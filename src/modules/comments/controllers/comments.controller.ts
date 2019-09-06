import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Inject,
  Req,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentInterface } from '../interfaces/comment.interface';
import { UserAuthService } from '../../user/services/user.auth.service';
import { Request } from 'express';

@Controller('api/comments')
export class CommentsController {
  constructor(
    @Inject(CommentsService)
    protected readonly commentsService: CommentsService,
    @Inject(UserAuthService) protected userAuthService: UserAuthService,
  ) {}

  @Post('/:idea_id')
  async create(
    @Param() ideaId: string,
    @Body() comment: CommentInterface,
    @Req() req: Request,
  ) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      comment.userId = user.id;
      return this.commentsService.create(ideaId, comment);
    }
  }

  @Get('/:idea_id')
  getByPost(@Param() ideaId: string) {
    return this.commentsService.getByIdea(ideaId);
  }
}
