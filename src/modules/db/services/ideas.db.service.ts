import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { IdeasDBServiceInterface } from 'src/modules/ideas/interfaces/ideas.db.service.interface';

@Injectable()
export class IdeasDBService implements IdeasDBServiceInterface {
  constructor(
    @Inject('IDEAS_REPOSITORY') protected ideasRepository: Repository<Idea>,
  ) {
  }
}
