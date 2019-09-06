import { Injectable, Inject } from '@nestjs/common';
import { IdeaInterface } from '../interfaces/idea.interface';
import { CreateIdeaRequest } from '../interfaces/createIdea.interface';
import { IdeasDBServiceInterface } from '../interfaces/ideas.db.service.interface';
import { DEFAULT_USER_ID } from '../../../constants';

@Injectable()
export class IdeasService {
  constructor(
    @Inject('IdeasDBService') protected dbService: IdeasDBServiceInterface,
  ) {}

  async create(item: CreateIdeaRequest, userId: string = DEFAULT_USER_ID) {
    const idea = await this.dbService.create(item);
    idea.owner = userId;
    this.setupIdeaFields(idea);
    return await this.dbService.findByIdAndUpdate(idea.id, idea);
  }

  getAll(): Promise<IdeaInterface[]> {
    return this.dbService.find();
  }

  async getById(ideaId: string) {
    return this.dbService.findById(ideaId);
  }

  setupIdeaFields(idea: IdeaInterface) {
    if (!idea.usersWhoDisliked) {
      idea.usersWhoDisliked = [];
    }

    if (!idea.usersWhoLiked) {
      idea.usersWhoLiked = [];
    }

    if (!idea.likes) {
      idea.likes = 0;
    }

    if (!idea.dislikes) {
      idea.dislikes = 0;
    }
  }

  async like(ideaId: string, userId: string = DEFAULT_USER_ID) {
    const idea: IdeaInterface = await this.dbService.findById(ideaId);
    this.setupIdeaFields(idea);

    if (idea.usersWhoLiked.some(id => userId === id)) {
      throw new Error('Cannot like more than once.');
    }

    // In case, a user disliked an idea: need to remove a dislike and set like
    if (idea.usersWhoDisliked.some(id => userId === id)) {
      idea.dislikes -= 1;
      const userIndex = idea.usersWhoDisliked.findIndex(id => id === userId);
      idea.usersWhoDisliked.splice(userIndex, 1);
    }

    idea.likes += 1;
    return this.dbService.findByIdAndUpdate(ideaId, idea);
  }

  async dislike(ideaId: string, userId: string = DEFAULT_USER_ID) {
    const idea: IdeaInterface = await this.dbService.findById(ideaId);
    this.setupIdeaFields(idea);

    if (idea.usersWhoDisliked.some(id => userId === id)) {
      throw new Error('Cannot dislike more than once.');
    }

    // In case, a user liked an idea: need to remove a like and set dislike
    if (idea.usersWhoDisliked.some(id => userId === id)) {
      idea.likes -= 1;
      const userIndex = idea.usersWhoLiked.findIndex(id => id === userId);
      idea.usersWhoLiked.splice(userIndex, 1);
    }

    idea.dislikes += 1;
    return this.dbService.findByIdAndUpdate(ideaId, idea);
  }
}
