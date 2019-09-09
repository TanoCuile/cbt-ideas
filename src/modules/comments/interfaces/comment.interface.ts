import { ApiModelProperty } from '@nestjs/swagger';

export class User {
  @ApiModelProperty() _id: string;
  @ApiModelProperty() name: string;
  @ApiModelProperty() token: string;
  @ApiModelProperty() email: string;
  @ApiModelProperty() role: string;
  @ApiModelProperty() company: string;
}

export class CommentInterface {
  @ApiModelProperty() id: string;
  @ApiModelProperty() message: string;
  @ApiModelProperty() ideaId: string;
  @ApiModelProperty() user: User;
  @ApiModelProperty() mentionedUsers: string[];
  @ApiModelProperty() parentCommentId?: string;
  @ApiModelProperty() createdAt: Date;
}
