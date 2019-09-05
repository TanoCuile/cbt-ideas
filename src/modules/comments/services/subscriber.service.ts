import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from "typeorm";
import { Comment } from "src/modules/db/models/comment.model";
import { Inject } from "@nestjs/common";
import { Idea } from "src/modules/db/models/idea.model";
import { MailService } from "src/modules/notifications/services/mail.service";

@EventSubscriber()
export class CommentsSubscriber implements EntitySubscriberInterface<Idea> {
  constructor(
    @Inject('MONGO_DB_CONNECTION') private readonly connection: Connection,
    private readonly mailer: MailService
  ) {
    this.connection.subscribers.push(this);
  }
  
  listenTo() {
    return Idea;
  }

  afterInsert(event: InsertEvent<Idea>) {
    console.error('not implemented');
    this.mailer.send();
  }
}