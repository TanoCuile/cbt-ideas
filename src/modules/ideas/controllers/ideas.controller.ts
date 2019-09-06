import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Inject,
  Req,
} from '@nestjs/common';

import { IdeasService } from '../services/ideas.service';
import { CreateIdeaRequest } from '../interfaces/createIdea.interface';
import { AuthGuard } from '../../../guards/auth.guard';
import { UserAuthService } from '../../user/services/user.auth.service';
import { Request } from 'express';

@Controller('api/ideas')
@UseGuards(AuthGuard)
export class IdeasController {
  constructor(
    @Inject(IdeasService) protected readonly ideasService: IdeasService,
    @Inject(UserAuthService) protected userAuthService: UserAuthService,
  ) {}

  @Post()
  async create(@Body() idea: CreateIdeaRequest, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      return this.ideasService.create(idea, user.id);
    }
  }

  @Get()
  getAll() {
    return this.ideasService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.ideasService.getById(id);
  }

  @Post('/:id/like')
  async like(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      return this.ideasService.like(id, user.id);
    }
  }

  @Post('/:id/dislike')
  async dislike(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      return this.ideasService.dislike(id, user.id);
    }
  }
}
