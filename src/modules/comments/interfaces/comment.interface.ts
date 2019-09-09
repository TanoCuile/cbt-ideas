import { ApiModelProperty } from '@nestjs/swagger';

export class CommentInterface {
  @ApiModelProperty() id: string;
  @ApiModelProperty() message: string;
  @ApiModelProperty() ideaId: string;
  @ApiModelProperty() userId: string;
  @ApiModelProperty() mentionedUsers: string[];
  @ApiModelProperty() parentCommentId?: string;
}
