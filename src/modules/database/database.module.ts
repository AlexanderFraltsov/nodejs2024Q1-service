import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { ArtistRepository } from './repositories/artist.repository';
import { AlbumRepository } from './repositories/album.repository';
import { TrackRepository } from './repositories/track.repository';

@Module({
	imports: [],
	providers: [
		AlbumRepository,
		ArtistRepository,
		TrackRepository,
		UserRepository,
	],
	exports: [
		AlbumRepository,
		ArtistRepository,
		TrackRepository,
		UserRepository,
	],
})
export class DataBaseModule {}
