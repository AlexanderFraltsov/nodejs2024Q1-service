import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AlbumResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'Album ID' })
  id: string;
  @ApiProperty({ type: 'string', description: 'Album name' })
  name: string;
  @ApiProperty({ type: 'number', description: 'Album year' })
  year: number;
  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    description: 'Artist ID',
  })
  artistId: string | null;
}
