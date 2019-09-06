import { ApiModelProperty } from '@nestjs/swagger';

export class CreateIdeaRequest {
  @ApiModelProperty() title: string;
  @ApiModelProperty() description: string;
}