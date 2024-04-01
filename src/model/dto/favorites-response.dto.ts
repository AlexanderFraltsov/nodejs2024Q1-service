import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponseDto } from './album-response.dto';
import { ArtistResponseDto } from './artist-response.dto';
import { TrackResponseDto } from './track-response.dto';

export class FavoritesResponseDto {
  @ApiProperty({
    type: ArtistResponseDto,
    isArray: true,
    description: 'Artists',
  })
  artists: ArtistResponseDto[];
  @ApiProperty({ type: AlbumResponseDto, isArray: true, description: 'Albums' })
  albums: AlbumResponseDto[];
  @ApiProperty({ type: TrackResponseDto, isArray: true, description: 'Tracks' })
  tracks: TrackResponseDto[];
}
