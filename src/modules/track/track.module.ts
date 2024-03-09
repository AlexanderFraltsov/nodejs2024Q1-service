import { Module } from '@nestjs/common';
import { DataBaseModule } from '../database/database.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
	imports: [DataBaseModule],
	providers: [TrackService],
	controllers: [TrackController],
})
export class TrackModule {}
