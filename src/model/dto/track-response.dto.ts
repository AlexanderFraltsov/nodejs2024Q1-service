import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'User ID' })
  id: string;
  @ApiProperty({ type: 'string', description: 'Track name' })
  name: string;
  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    description: 'Artist ID',
  })
  artistId: string | null;
  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    description: 'Album ID',
  })
  albumId: string | null;
  @ApiProperty({ type: 'number', description: 'Track duration' })
  duration: number;
}
