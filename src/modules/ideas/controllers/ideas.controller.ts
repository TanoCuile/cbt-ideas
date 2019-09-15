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
import { Request } from 'express';

import { IdeasService } from '../services/ideas.service';
import { UserAuthService } from '../../user/services/user.auth.service';
import { IdeaCreateDTO } from '../dto/idea-create.dto';
import { IdeaResponseDTO } from '../dto/idea-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/ideas')
@UseGuards(AuthGuard('token'))
export class IdeasController {
  constructor(
    @Inject(IdeasService) protected readonly ideasService: IdeasService,
    @Inject(UserAuthService) protected userAuthService: UserAuthService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: IdeaResponseDTO })
  async create(@Body() idea: IdeaCreateDTO, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      const response = await this.ideasService.getResponseFromIdeas([
        await this.ideasService.create(idea, user.id),
      ]);
      return response[0];
    }
    throw new UnauthorizedException();
  }

  @Get()
  @ApiResponse({ status: 200, type: IdeaResponseDTO, isArray: true })
  async getAll(@Req() req: Request) {
    return await this.ideasService.getResponseFromIdeas(
      await this.ideasService.getAll(),
    );
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: IdeaResponseDTO, isArray: true })
  async get(@Param('id') id: string) {
    const response = await this.ideasService.getResponseFromIdeas([
      await this.ideasService.getById(id),
    ]);
    return response[0];
  }

  @Post('/:id/like')
  @ApiCreatedResponse({ type: IdeaResponseDTO })
  async like(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      await this.ideasService.like(id, user.id);
    }

    return this.get(id);
  }

  @Post('/:id/dislike')
  @ApiCreatedResponse({ type: IdeaResponseDTO })
  async dislike(@Param('id') id: string, @Req() req: Request) {
    const user = await this.userAuthService.getUserFromRequest(req);
    if (user) {
      await this.ideasService.dislike(id, user.id);
    }

    return this.get(id);
  }
}
