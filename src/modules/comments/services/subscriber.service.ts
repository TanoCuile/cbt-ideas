import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Connection } from "typeorm";
import { Comment } from "src/modules/db/models/comment.model";
import { Inject } from "@nestjs/common";
import { MailService } from "src/modules/notifications/services/mail.service";
import { IdeasDBServiceInterface } from "src/modules/ideas/interfaces/ideas.db.service.interface";

@EventSubscriber()
export class CommentsSubscriber implements EntitySubscriberInterface<Comment> {
  constructor(
    @Inject('MONGO_DB_CONNECTION') private readonly connection: Connection,
    @Inject('IdeasDBService') private readonly ideasDBService: IdeasDBServiceInterface,
    // @Inject('UsersDBService') private readonly usersDBService: UsersDBService,
    private readonly mailer: MailService
  ) {
    this.connection.subscribers.push(this);
  }
  
  listenTo() {
    return Comment;
  }

  async afterInsert(event: InsertEvent<Comment>) {
    const comment = event.entity;
    const idea = await this.ideasDBService.findById(comment.ideaId);
    if (!idea) {
      return;
    }
    // const user = await this.usersDBService.findById(idea.owner);

    /** @todo uncomment getting user and pass user.email */
    return this.mailer.send(null, idea.title, comment.message);
  }
}