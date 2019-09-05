import { Injectable, Inject } from '@nestjs/common';
import { IdeaInterface } from '../interfaces/idea.interface';
import { IdeasDBServiceInterface } from '../interfaces/ideas.db.service.interface';

@Injectable()
export class IdeasService {
  constructor(
    @Inject('IdeasDBService') protected dbService: IdeasDBServiceInterface,
  ) {}

  create(item: IdeaInterface) {
    return this.dbService.create(item);
  }

  getAll(): Promise<IdeaInterface[]> {
    return this.dbService.find();
  }

  async like(ideaId: string) {
    // TODO: get real user id
    const userId = 'user_id'
    const idea: IdeaInterface = await this.dbService.findById(ideaId);
    
    if (idea.usersWhoLiked.some(id => userId === id)) {
      throw new Error('Cannot like more than once.')
    }

    // In case, a user disliked an idea: need to remove a dislike and set like
    if (idea.usersWhoDisliked.some(id => userId === id)) {
      idea.dislikes -= 1;
      const userIndex = idea.usersWhoDisliked.findIndex(id => id === userId);
      idea.usersWhoDisliked.splice(userIndex, 1);
    }

    idea.likes += 1
    return this.dbService.findByIdAndUpdate(ideaId, idea);
  }

  async dislike(ideaId: string) {
    // TODO: get real user id
    const userId = 'user_id'
    const idea: IdeaInterface = await this.dbService.findById(ideaId);
    
    if (idea.usersWhoDisliked.some(id => userId === id)) {
      throw new Error('Cannot dislike more than once.')
    }

    // In case, a user liked an idea: need to remove a like and set dislike
    if (idea.usersWhoDisliked.some(id => userId === id)) {
      idea.likes -= 1;
      const userIndex = idea.usersWhoLiked.findIndex(id => id === userId);
      idea.usersWhoLiked.splice(userIndex, 1);
    }

    idea.dislikes += 1
    return this.dbService.findByIdAndUpdate(ideaId, idea);
  }
}
