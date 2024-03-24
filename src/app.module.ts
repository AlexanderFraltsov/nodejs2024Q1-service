import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/user.entity';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TrackEntity } from './modules/track/track.entity';
import { AlbumEntity } from './modules/album/album.entity';
import { ArtistEntity } from './modules/artist/artist.entity';
import { FavoritesEntity } from './modules/favorites/favorites.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<TypeOrmModuleAsyncOptions>('db'));
        return {
          ...configService.get<TypeOrmModuleAsyncOptions>('db'),
          type: 'postgres',
          synchronize: false,
          autoLoadEntities: true,
          entities: [
            UserEntity,
            TrackEntity,
            AlbumEntity,
            ArtistEntity,
            FavoritesEntity,
          ],
          logging: false,
        };
      },
    }),
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    UserModule,
  ],
})
export class AppModule {}
