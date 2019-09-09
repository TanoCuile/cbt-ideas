import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  Connection,
} from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { Idea } from '../../db/models/idea.model';
import { UsersDBService } from '../../db/services/users.db.service';
import { UserRolesEnum } from '../../user/interfaces/user-roles.enum';
import { MailTemplateService } from './mail-template.service';
import { DEFAULT_DOMAIN } from '../../../constants';

@Injectable()
@EventSubscriber()
export class IdeasSubscriber implements EntitySubscriberInterface<Idea> {
  constructor(
    @Inject('MONGO_DB_CONNECTION') private readonly connection: Connection,
    @Inject('UsersDBService') private readonly usersDBService: UsersDBService,
    private readonly mailer: MailService,
    @Inject(MailTemplateService)
    protected readonly templateService: MailTemplateService,
  ) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return Idea;
  }

  async afterInsert(event: InsertEvent<Idea>) {
    const idea = event.entity;
    const admins = await this.usersDBService.getByCriteria({
      role: UserRolesEnum.ADMIN,
    });

    return Promise.all(
      admins.map(async admin =>
        this.mailer.send(
          admin.email,
          'New idea: ' + idea.title,
          await this.templateService.getMailBody('new-idea', {
            idea,
            ideaLink: `${DEFAULT_DOMAIN}/idea/${idea.id}`,
          }),
        ),
      ),
    );
  }
}
