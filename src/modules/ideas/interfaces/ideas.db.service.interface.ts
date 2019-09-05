import { Idea } from './idea.interface'

export interface IdeasDBServiceInterface {
  create: (idea: Idea) => Idea;
  getAll: () => Idea[];
  likeIdea: (id: string) => Idea;
  dislikeIdea: (id: string) => Idea;
}