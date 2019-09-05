import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { IdeasDBServiceInterface } from 'src/modules/ideas/interfaces/ideas.db.service.interface';
import { IdeaInterface } from 'src/modules/ideas/interfaces/idea.interface';

export class IdeasDBService implements IdeasDBServiceInterface {
  constructor(
    protected ideasRepository: Repository<Idea>,
  ) {}

  create(idea: IdeaInterface): Promise<IdeaInterface> {
    return this.ideasRepository.create(idea);
  }
  find(): Promise<IdeaInterface[]> {
    return this.ideasRepository.find();
  }
  findByIdAndUpdate(id: string, payload: IdeaInterface): Promise<IdeaInterface> {
    throw new Error('Not implemented.')
  }
}
