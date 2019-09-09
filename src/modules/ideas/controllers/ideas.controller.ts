import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Inject,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { IdeasService } from '../services/ideas.service';
import { CreateIdeaRequest } from '../dto/createIdea.dto';
import { AuthGuard } from '../../../guards/auth.guard';
import { UserAuthService } from '../../user/services/user.auth.service';
import { Request } from 'express';
import { IdeaInterface } from '../interfaces/idea.interface';

@Controller('api/ideas')
@UseGuards(AuthGuard)
export class IdeasController {
  constructor(
    @Inject(IdeasService) protected readonly ideasService: IdeasService,
    @Inject(UserAuthService) protected userAuthService: UserAuthService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: IdeaInterface })
  async create(@Body() idea: CreateIdeaRequest, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      const response = await this.ideasService.getResponseFromIdeas([await this.ideasService.create(idea, user.id)]);
      return response[0];
    }
    throw new UnauthorizedException();
  }

  @Get()
  @ApiResponse({ status: 200, type: [IdeaInterface] })
  async getAll() {
    return await this.ideasService.getResponseFromIdeas(
      await this.ideasService.getAll(),
    );
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: [IdeaInterface] })
  async get(@Param('id') id: string) {
    const response = await this.ideasService.getResponseFromIdeas([
      await this.ideasService.getById(id),
    ]);
    return response[0];
  }

  @Post('/:id/like')
  @ApiCreatedResponse({ type: IdeaInterface })
  async like(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      await this.ideasService.like(id, user.id);
    }

    return this.get(id);
  }

  @Post('/:id/dislike')
  @ApiCreatedResponse({ type: IdeaInterface })
  async dislike(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      await this.ideasService.dislike(id, user.id);
    }

    return this.get(id);
  }
}
