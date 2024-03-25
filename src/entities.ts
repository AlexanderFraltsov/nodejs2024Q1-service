import { AlbumEntity } from './modules/album/album.entity';
import { ArtistEntity } from './modules/artist/artist.entity';
import { FavoritesEntity } from './modules/favorites/favorites.entity';
import { TrackEntity } from './modules/track/track.entity';
import { UserEntity } from './modules/user/user.entity';

export const entities = [
  UserEntity,
  TrackEntity,
  AlbumEntity,
  ArtistEntity,
  FavoritesEntity,
];
