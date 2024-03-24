import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), FavoritesModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
