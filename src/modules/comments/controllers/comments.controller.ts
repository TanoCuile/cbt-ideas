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

  @Post('/:post_id/comments')
  create(@Param() post_id: string, @Body() comment: Comment) {
    return this.commentsService.create(post_id, comment);
  }

  @Get('/:post_id')
  getByPost(@Param() post_id: string) {
    return this.commentsService.getByPost(post_id);
  }
}
