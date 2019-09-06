import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';

import { IdeasService } from '../services/ideas.service';
import { CreateIdeaRequest } from '../interfaces/createIdea.interface';

@Controller('api/ideas')
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

  @Post('/:id/like')
  like(@Param() id: string) {
    return this.ideasService.like(id);
  }

  @Post('/:id/dislike')
  dislike(@Param() id: string) {
    return this.ideasService.dislike(id);
  }
}
