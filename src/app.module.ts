import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { entities } from './entities';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleAsyncOptions>('db'),
        type: 'postgres',
        synchronize: false,
        autoLoadEntities: true,
        entities,
        logging: false,
      }),
    }),
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    UserModule,
  ],
})
export class AppModule {}
