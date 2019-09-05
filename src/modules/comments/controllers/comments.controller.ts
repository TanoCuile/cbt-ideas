import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';

import { CommentsService } from '../services/comments.service';
import { Comment } from '../interfaces/comment.interface';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:idea_id/comments')
  create(@Param() idea_id: string, @Body() comment: Comment) {
    return this.commentsService.create(idea_id, comment);
  }

  @Get('/:idea_id')
  getByPost(@Param() idea_id: string) {
    return this.commentsService.getByPost(idea_id);
  }
}
