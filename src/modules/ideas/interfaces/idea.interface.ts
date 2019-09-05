export interface IdeaInterface {
  id?: string;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  usersWhoLiked: Array<string>;
  usersWhoDisliked: Array<string>;

  // refers to user who created an idea
  owner: string;
}