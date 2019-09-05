import { ClassProvider } from '@nestjs/common/interfaces';
import { Repository } from 'typeorm';
import { Idea } from '../models/idea.model';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { User } from '../models/user.model';
import { IdeaInterface } from 'src/modules/ideas/interfaces/idea.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Comment } from '../models/comment.model';

@Injectable()
export class FixturesProvider {
  constructor(
    @Inject('IDEAS_REPOSITORY') protected ideasRepo: Repository<Idea>,
    @Inject('COMMENTS_REPOSITORY') protected commentsRepo: Repository<Comment>,
    @Inject('USERS_REPOSITORY') protected userRepo: Repository<User>,
  ) {}

  async shouldImportFixtures(): Promise<boolean> {
    return true;
  }

  async import(): Promise<boolean> {
    try {
      const ideasFixtures = JSON.parse(
        readFileSync(
          resolve(process.cwd(), 'resources', 'fixtures', 'ideas.fixture.json'),
        ).toString(),
      ) as Idea[];

      const usersFixtures = JSON.parse(
        readFileSync(
          resolve(process.cwd(), 'resources', 'fixtures', 'users.fixture.json'),
        ).toString(),
      );

      const commentsFixtures = JSON.parse(
        readFileSync(
          resolve(
            process.cwd(),
            'resources',
            'fixtures',
            'comments.fixture.json',
          ),
        ).toString(),
      );

      await Promise.all(
        ideasFixtures
          .map(raw => Object.assign(new Idea(), raw))
          .map(idea => this.ideasRepo.save(idea)),
      );
      await Promise.all(
        commentsFixtures
          .map(raw => Object.assign(new Comment(), raw))
          .map(comment => this.commentsRepo.save(comment)),
      );
      await Promise.all(
        usersFixtures
          .map(raw => Object.assign(new User(), raw))
          .map(user => this.userRepo.save(user)),
      );
      console.log('OK');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
