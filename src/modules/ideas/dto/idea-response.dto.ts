import { ApiModelProperty } from '@nestjs/swagger';

export class IdeaResponseDTO {
  @ApiModelProperty() title: string;
  @ApiModelProperty() description: string;

  @ApiModelProperty()
  likes: number;

  @ApiModelProperty()
  commentsCount: number;

  @ApiModelProperty()
  dislikes: number;

  @ApiModelProperty()
  owner: string;
  @ApiModelProperty()
  userName: string;
}
