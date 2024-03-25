import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artist' })
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;
}
