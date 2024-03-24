import 'dotenv/config';
import { DataSource } from 'typeorm';

import configuration from './config/configuration';
import { UserEntity } from './modules/user/user.entity';
import { TrackEntity } from './modules/track/track.entity';
import { AlbumEntity } from './modules/album/album.entity';
import { ArtistEntity } from './modules/artist/artist.entity';

export default new DataSource({
  ...configuration().db,
  type: 'postgres',
  entities: [
		UserEntity,
		TrackEntity,
		AlbumEntity,
		ArtistEntity,
	],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
