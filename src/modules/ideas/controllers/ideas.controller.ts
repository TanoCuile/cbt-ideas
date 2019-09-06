import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';

import { IdeasService } from '../services/ideas.service';
import { CreateIdeaRequest } from '../interfaces/createIdea.interface';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('api/ideas')
@UseGuards(AuthGuard)
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  create(@Body() idea: CreateIdeaRequest) {
    return this.ideasService.create(idea);
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
  like(@Param('id') id: string) {
    return this.ideasService.like(id);
  }

  @Post('/:id/dislike')
  dislike(@Param('id') id: string) {
    return this.ideasService.dislike(id);
  }
}
