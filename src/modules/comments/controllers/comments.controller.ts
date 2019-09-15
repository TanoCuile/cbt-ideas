import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from '../services/comments.service';
import { CommentInterface } from '../interfaces/comment.interface';
import { UserAuthService } from '../../user/services/user.auth.service';
import { Request } from 'express';
import { CommentResponseDTO } from '../dtos/comment-response.dto';
import { CommentCreateDTO } from '../dtos/comment-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/comments')
@UseGuards(AuthGuard('token'))
export class CommentsController {
  constructor(
    @Inject(CommentsService)
    protected readonly commentsService: CommentsService,
    @Inject(UserAuthService) protected userAuthService: UserAuthService,
  ) {}

  @Post('/:idea_id')
  @ApiCreatedResponse({ type: CommentCreateDTO })
  async create(
    @Param('idea_id') ideaId: string,
    @Body() comment: CommentInterface,
    @Req() req: Request,
  ) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      comment.userId = user.id;
      const storedComment = await this.commentsService.create(ideaId, comment);

      const commentResponse = await this.commentsService.getResponseFromComments(
        [storedComment],
      );

      return commentResponse[0];
    }
  }

  @Get('/:ideaId')
  @ApiResponse({ status: 200, type: CommentResponseDTO, isArray: true })
  async getByPost(@Param() { ideaId }: { ideaId: string }) {
    return this.commentsService.getResponseFromComments(
      await this.commentsService.getByIdea(ideaId),
    );
  }
}
