import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';

@Entity({ name: 'track' })
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'integer' })
  duration: number;

  @ManyToOne(() => AlbumEntity, ({ id }) => id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  album: AlbumEntity;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;

  @ManyToOne(() => ArtistEntity, ({ id }) => id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: ArtistEntity;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;
}
