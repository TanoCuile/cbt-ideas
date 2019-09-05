export interface Idea {
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly likes: number;
  readonly dislikes: number;
  readonly users_who_liked: Array<string>;
  readonly users_who_disliked: Array<string>;

  // refers to user who created an idea
  readonly owner: string;
}