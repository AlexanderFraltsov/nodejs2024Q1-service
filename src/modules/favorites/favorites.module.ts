import { Module } from '@nestjs/common';

import { DataBaseModule } from '../database/database.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
	imports: [DataBaseModule],
	controllers: [FavoritesController],
	providers: [FavoritesService],
})
export class FavoritesModule {}
