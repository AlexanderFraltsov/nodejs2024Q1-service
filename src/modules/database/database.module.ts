import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { ArtistRepository } from './repositories/artist.repository';
import { AlbumRepository } from './repositories/album.repository';

@Module({
	imports: [],
	providers: [
		AlbumRepository,
		ArtistRepository,
		UserRepository,
	],
	exports: [
		AlbumRepository,
		ArtistRepository,
		UserRepository,
	],
})
export class DataBaseModule {}
