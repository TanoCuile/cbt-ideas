import { IdeaInterface } from './idea.interface';
import { CreateIdeaRequest } from './createIdea.interface';

export interface IdeasDBServiceInterface {
  findByIdAndUpdate(ideaId: string, idea: IdeaInterface);
  findById(ideaId: string): IdeaInterface | PromiseLike<IdeaInterface>;
  create(idea: CreateIdeaRequest): Promise<IdeaInterface>;
  find(): Promise<IdeaInterface[]>;
}
