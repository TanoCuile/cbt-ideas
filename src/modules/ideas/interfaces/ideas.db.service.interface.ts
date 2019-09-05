import { IdeaInterface } from './idea.interface';

export interface IdeasDBServiceInterface {
  create(idea: IdeaInterface): Promise<IdeaInterface>;
  find(): Promise<IdeaInterface[]>;
  save(idea: IdeaInterface): Promise<IdeaInterface>;
}
