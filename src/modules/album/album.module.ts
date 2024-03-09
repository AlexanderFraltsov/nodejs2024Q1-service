import { Module } from '@nestjs/common';
import { DataBaseModule } from '../database/database.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
	imports: [DataBaseModule],
	providers: [AlbumService],
	controllers: [AlbumController],
})
export class AlbumModule {}
