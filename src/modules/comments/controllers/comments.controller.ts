import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentInterface } from '../interfaces/comment.interface';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:idea_id')
  create(@Param() ideaId: string, @Body() comment: CommentInterface) {
    return this.commentsService.create(ideaId, comment);
  }

  @Get('/:idea_id')
  getByPost(@Param() ideaId: string) {
    return this.commentsService.getByIdea(ideaId);
  }
}
