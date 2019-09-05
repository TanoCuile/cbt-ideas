import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';

import { IdeasService } from '../services/ideas.service';
import { Idea } from 'src/modules/db/models/idea.model';

@Controller('api/ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  create(@Body() post: Idea) {
    return this.ideasService.create(post);
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
