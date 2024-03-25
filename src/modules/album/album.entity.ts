import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from '../artist/artist.entity';

@Entity({ name: 'album' })
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @ManyToOne(() => ArtistEntity, ({ id }) => id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: ArtistEntity;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;
}
