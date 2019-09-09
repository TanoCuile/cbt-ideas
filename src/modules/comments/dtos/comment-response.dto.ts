import { ApiModelProperty } from '@nestjs/swagger';

export class CommentResponseDTO {
  @ApiModelProperty() id: string;
  @ApiModelProperty() message: string;
  @ApiModelProperty() ideaId: string;
  @ApiModelProperty() userId: string;
  @ApiModelProperty() userName: string;
  @ApiModelProperty() mentionedUsers: string[];
  @ApiModelProperty() parentCommentId?: string;
  @ApiModelProperty() createdAt: Date;
}