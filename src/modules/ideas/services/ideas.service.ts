import { Injectable, Inject } from '@nestjs/common';
import { IdeaInterface } from '../interfaces/idea.interface';
import { CreateIdeaRequest } from '../dto/createIdea.dto';
import { IdeasDBServiceInterface } from '../interfaces/ideas.db.service.interface';
import { UserAuthService } from '../../user/services/user.auth.service';
import { DEFAULT_USER_ID } from '../../../constants';

@Injectable()
export class IdeasService {
  constructor(
    @Inject('IdeasDBService') protected dbService: IdeasDBServiceInterface,
    @Inject(UserAuthService) protected userAuthService: UserAuthService,
  ) {}

  async create(item: CreateIdeaRequest, userId: string = DEFAULT_USER_ID) {
    const idea = await this.dbService.create(item);
    idea.owner = userId;
    this.setupIdeaFields(idea);
    return await this.dbService.findByIdAndUpdate(idea.id, idea);
  }

  async getResponseFromIdeas(ideas: IdeaInterface[]) {
    console.log(this.getUserIdsFromIdeas(ideas));
    const users = (await this.userAuthService.getUsersInfo(
      this.getUserIdsFromIdeas(ideas),
    )).reduce(
      (total, user) => {
        total[user.id] = { name: user.name };
        return total;
      },
      {} as {
        [key: string]: {
          name: string;
        };
      },
    );
    console.log(users);
    const ideasResponse = ideas.map(idea => {
      const id = idea.id;
      delete (idea as any)._id;
      return Object.assign({}, idea, {
        id,
        userName: users[idea.owner] ? users[idea.owner].name : 'John Doe',
      });
    });
    return ideasResponse;
  }

  getUserIdsFromIdeas(ideas: IdeaInterface[]): string[] {
    return ideas.reduce(
      (prev, idea) => {
        if (prev.indexOf(idea.owner) < 0) {
          prev.push(idea.owner);
        }
        return prev;
      },
      [] as string[],
    );
  }

  getAll(): Promise<IdeaInterface[]> {
    return this.dbService.find();
  }

  async getById(ideaId: string) {
    return this.dbService.findById(ideaId);
  }

  setupIdeaFields(idea: IdeaInterface) {
    if (!idea) {
      return;
    }
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

    if (!idea.commentsCount) {
      idea.commentsCount = 0;
    }
  }

  async like(ideaId: string, userId: string = DEFAULT_USER_ID) {
    const idea: IdeaInterface = await this.dbService.findById(ideaId);
    this.setupIdeaFields(idea);

    if (idea.usersWhoLiked.some(id => userId === id)) {
      return;
      // throw new Error('Cannot like more than once.');
    }

    // In case, a user disliked an idea: need to remove a dislike and set like
    if (idea.usersWhoDisliked.some(id => userId === id)) {
      idea.dislikes -= 1;
      idea.usersWhoDisliked = idea.usersWhoDisliked.filter((uid) => userId !== uid);
    }

    idea.usersWhoLiked.push(userId);
    idea.likes += 1;
    return this.dbService.findByIdAndUpdate(ideaId, idea);
  }

  async dislike(ideaId: string, userId: string = DEFAULT_USER_ID) {
    const idea: IdeaInterface = await this.dbService.findById(ideaId);

    this.setupIdeaFields(idea);

    if (idea.usersWhoDisliked.some(id => userId === id)) {
      return;
      // throw new Error('Cannot dislike more than once.');
    }

    // In case, a user liked an idea: need to remove a like and set dislike
    if (idea.usersWhoLiked.some(id => userId === id)) {
      idea.likes -= 1;
      idea.usersWhoLiked = idea.usersWhoLiked.filter((uid) => userId !== uid);
    }

    idea.usersWhoDisliked.push(userId);
    idea.dislikes += 1;
    return this.dbService.findByIdAndUpdate(ideaId, idea);
  }
}
