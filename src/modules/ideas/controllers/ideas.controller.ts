import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';

import { IdeaInterface } from '../interfaces/idea.interface';
import { IdeasService } from '../services/ideas.service';

@Controller('api/ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  create(@Body() post: IdeaInterface) {
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
