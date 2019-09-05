import { IdeaInterface } from './idea.interface';

export interface IdeasDBServiceInterface {
  findByIdAndUpdate(ideaId: string, idea: IdeaInterface);
  findById(ideaId: string): IdeaInterface | PromiseLike<IdeaInterface>;
  create(idea: IdeaInterface): IdeaInterface;
  find(): Promise<IdeaInterface[]>;
}
