import { Injectable, Inject } from '@nestjs/common';
import { IdeaInterface } from '../interfaces/idea.interface';
import { IdeasDBServiceInterface } from '../interfaces/ideas.db.service.interface';

@Injectable()
export class IdeasService {
  constructor(
    @Inject('IdeasDBService') protected dbService: IdeasDBServiceInterface,
  ) {}

  async create(item: IdeaInterface) {
    return this.dbService.create(item);
  }

  async getAll(): Promise<IdeaInterface[]> {
    return this.dbService.getAll();
  }

  async like(ideaId: string) {
    return this.dbService.likeIdea(ideaId, undefined);
  }

  async dislike(ideaId: string) {
    return await this.dbService.dislikeIdea(ideaId, undefined);
  }
}
