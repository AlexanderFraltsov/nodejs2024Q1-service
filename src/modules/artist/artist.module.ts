import { Module } from '@nestjs/common';
import { DataBaseModule } from '../database/database.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
	imports: [DataBaseModule],
	providers: [ArtistService],
	controllers: [ArtistController],
})
export class ArtistModule {}
