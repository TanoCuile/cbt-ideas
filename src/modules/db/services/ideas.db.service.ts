import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { IdeasDBServiceInterface } from 'src/modules/ideas/interfaces/ideas.db.service.interface';
import { IdeaInterface } from 'src/modules/ideas/interfaces/idea.interface';

export class IdeasDBService implements IdeasDBServiceInterface {
  constructor(
    protected ideasRepository: Repository<Idea>,
  ) {}

  async create(idea: IdeaInterface): Promise<IdeaInterface> {
    return this.ideasRepository.create(idea);
  }
  getAll(): Promise<IdeaInterface[]> {
    return this.ideasRepository.find();
  }
  likeIdea(id: string, userId: string): Promise<IdeaInterface> {
    throw new Error('Method not implemented.');
  }
  dislikeIdea(id: string, userId: string): Promise<IdeaInterface> {
    throw new Error('Method not implemented.');
  }
}
