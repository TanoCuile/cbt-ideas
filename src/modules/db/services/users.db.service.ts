import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { IdeasDBServiceInterface } from 'src/modules/ideas/interfaces/ideas.db.service.interface';
import { IdeaInterface } from 'src/modules/ideas/interfaces/idea.interface';

export class IdeasDBService implements IdeasDBServiceInterface {
  constructor(protected ideasRepository: Repository<Idea>) {}

  create(idea: IdeaInterface): Promise<IdeaInterface> {
    return this.ideasRepository.save(this.ideasRepository.create(idea));
  }

  find(): Promise<IdeaInterface[]> {
    return this.ideasRepository.find();
  }

  async findByIdAndUpdate(id: string, payload: Idea): Promise<IdeaInterface> {
    if (payload._id) {
      return this.ideasRepository.save(payload);
    }

    const idea = await this.findById(id);
    return this.ideasRepository.save(Object.assign({}, idea, payload));
  }

  async findById(id: string): Promise<IdeaInterface> {
    return (await this.ideasRepository.findByIds([id]))[0];
  }
}
