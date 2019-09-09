import { ApiModelProperty } from '@nestjs/swagger';

export class IdeaCreateDTO {
  @ApiModelProperty() title: string;
  @ApiModelProperty() description: string;
}