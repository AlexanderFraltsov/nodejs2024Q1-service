import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'User ID' })
  id: string;
  @ApiProperty({ type: 'string', description: 'Artist name' })
  name: string;
  @ApiProperty({ type: 'boolean', description: 'Artist has grammy' })
  grammy: boolean;
}
