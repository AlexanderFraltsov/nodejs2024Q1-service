import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { ArtistRepository } from './repositories/artist.repository';

@Module({
	imports: [],
	providers: [
		ArtistRepository,
		UserRepository,
	],
	exports: [
		ArtistRepository,
		UserRepository,
	],
})
export class DataBaseModule {}
