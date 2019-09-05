import { IdeaInterface } from './idea.interface';

export interface IdeasDBServiceInterface {
  create(idea: IdeaInterface): Promise<IdeaInterface>;
  getAll(): Promise<IdeaInterface[]>;
  likeIdea(id: string, userId: string): Promise<IdeaInterface>;
  dislikeIdea(id: string, userId: string): Promise<IdeaInterface>;
}
