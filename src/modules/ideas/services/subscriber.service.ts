import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from "typeorm";
import { Inject } from "@nestjs/common";
import { MailService } from "src/modules/notifications/services/mail.service";
import { Idea } from "src/modules/db/models/idea.model";

@EventSubscriber()
export class IdeasSubscriber implements EntitySubscriberInterface<Idea> {
  constructor(
    @Inject('MONGO_DB_CONNECTION') private readonly connection: Connection,
    private readonly mailer: MailService
  ) {
    this.connection.subscribers.push(this);
  }
  
  listenTo() {
    return Idea;
  }

  async afterInsert(event: InsertEvent<Idea>) {
    const idea = event.entity;

    return this.mailer.send(null, idea.title, idea.description); // send to support
  }
}