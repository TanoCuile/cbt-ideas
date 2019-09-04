export interface Comment {
  readonly id: string;
  readonly text: string;

  // post's id a comment refers to
  readonly post: string;
}