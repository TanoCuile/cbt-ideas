import { ApiModelProperty } from '@nestjs/swagger';

export class IdeaInterface {
  @ApiModelProperty() id?: string;
  @ApiModelProperty() title: string;
  @ApiModelProperty() description: string;
  @ApiModelProperty() likes: number;
  @ApiModelProperty() dislikes: number;
  @ApiModelProperty() usersWhoLiked: Array<string>;
  @ApiModelProperty() usersWhoDisliked: Array<string>;

  // refers to user who created an idea
  @ApiModelProperty() owner: string;
}