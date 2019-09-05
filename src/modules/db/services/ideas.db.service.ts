import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Idea } from '../models/idea.model';
import { IdeasDBServiceInterface } from 'src/modules/ideas/interfaces/ideas.db.service.interface';

@Injectable()
export class IdeasDBService implements IdeasDBServiceInterface {
  constructor(
    @InjectRepository(Idea) protected ideasRepository: Repository<Idea>,
  ) {}

  async create(idea: Idea): Promise<Idea> {
    return this.ideasRepository.save(idea);
  }
  getAll(): Promise<Idea[]> {
    return this.ideasRepository.find();
  }
  likeIdea(id: string, userId: string): Promise<Idea> {
    throw new Error('Method not implemented.');
  }
  dislikeIdea(id: string, userId: string): Promise<Idea> {
    throw new Error('Method not implemented.');
  }
}
