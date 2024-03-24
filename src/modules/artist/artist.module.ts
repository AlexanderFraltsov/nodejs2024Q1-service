import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './artist.entity';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity]), FavoritesModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
