import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';

@Injectable()
export class IdeasService {
  constructor(
    @Inject('IDEAS_REPOSITORY') protected ideasRepository: Repository<Idea>,
  ) {
  }
}
