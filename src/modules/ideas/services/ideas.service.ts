import { Injectable, Inject } from '@nestjs/common';
import { Idea } from '../interfaces/idea.interface';
import { IdeasDBService } from 'src/modules/db/services/ideas.db.service';
import { IdeasDBServiceInterface } from '../interfaces/ideas.db.service.interface';

@Injectable()
export class IdeasService {
  constructor(@Inject(IdeasDBService) protected dbService: IdeasDBServiceInterface) {}

  create(item: Idea) {
    return this.dbService.create(item);
  }

  getAll(): Idea[] {
    return this.dbService.getAll();
  }

  like(idea_id: string) {
    return this.dbService.likeIdea(idea_id);
  }

  dislike(idea_id: string) {
    return this.dbService.dislikeIdea(idea_id);
  }
}