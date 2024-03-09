import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
		ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
		AlbumModule,
		ArtistModule,
		FavoritesModule,
		TrackModule,
		UserModule,
	],
})
export class AppModule {}
