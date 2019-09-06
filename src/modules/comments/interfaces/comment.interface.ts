export interface CommentInterface {
  id: string;
  message: string;
  ideaId: string;
  userId: string;
  mensionedUsers: string[];
}
