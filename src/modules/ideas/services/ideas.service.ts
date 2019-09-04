import { Injectable } from '@nestjs/common';
import { Idea } from '../interfaces/idea.interface';

@Injectable()
export class IdeasService {
  private readonly ideas: Idea[] = [];

  create(item: Idea) {
    this.ideas.push(item);

    return item;
  }

  getAll(): Idea[] {
    return this.ideas;
  }

  like(postId: string) {
    return true;
  }

  dislike(postId: string) {
    return true;
  }
}