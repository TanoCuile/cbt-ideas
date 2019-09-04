import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';

import { CommentsService } from '../services/comments.service';
import { Comment } from '../interfaces/comment.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:post/comments')
  create(@Param() post: string, @Body() comment: Comment) {
    return this.commentsService.create(post, comment);
  }

  @Get('/:post')
  getByPost(@Param() post: string) {
    return this.commentsService.getByPost(post);
  }
}
