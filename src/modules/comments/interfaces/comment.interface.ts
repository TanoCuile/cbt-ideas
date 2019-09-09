
export class CommentInterface {
  id: string;
  message: string;
  ideaId: string;
  userId: string;
  mentionedUsers: string[];
  parentCommentId?: string;
  createdAt: Date;
}
