export interface IdeaInterface {
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly likes: number;
  readonly dislikes: number;

  // refers to user who created an idea
  readonly owner: string;
}