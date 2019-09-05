import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Idea } from 'src/modules/db/models/idea.model';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea) protected repository: Repository<Idea>,
  ) {}

  async create(item: Idea) {
    return this.repository.save(item);
  }

  async getAll() {
    return this.repository.find();
  }

  async like(ideaId: string) {
    throw new Error('Method not implemented.');
  }

  async dislike(ideaId: string) {
    throw new Error('Method not implemented.');
  }
}
