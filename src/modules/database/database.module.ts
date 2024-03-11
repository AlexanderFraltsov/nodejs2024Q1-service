import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { ArtistRepository } from './repositories/artist.repository';
import { AlbumRepository } from './repositories/album.repository';
import { TrackRepository } from './repositories/track.repository';
import { FavoritesRepository } from './repositories/favorites.repository';

@Module({
  imports: [],
  providers: [
    AlbumRepository,
    ArtistRepository,
    FavoritesRepository,
    TrackRepository,
    UserRepository,
  ],
  exports: [
    AlbumRepository,
    ArtistRepository,
    FavoritesRepository,
    TrackRepository,
    UserRepository,
  ],
})
export class DataBaseModule {}
