import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { TrackEntity } from '../track/track.entity';

export const FAVORITE_KEY = 'key';

@Entity({ name: 'favorites' })
export class FavoritesEntity {
  @PrimaryColumn({ primary: true, type: 'varchar', default: FAVORITE_KEY })
  id: string;

  @ManyToMany(() => AlbumEntity)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity)
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => TrackEntity)
  @JoinTable()
  tracks: TrackEntity[];
}
