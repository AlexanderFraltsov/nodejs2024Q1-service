import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { CreateTrackDto, ITrack, UpdateTrackDto } from 'src/model';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
	constructor(private readonly trackService: TrackService) {}

	@Get()
	getAll(): Promise<ITrack[]> {
		return this.trackService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<ITrack> {
		return this.trackService.getOneById(id)
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() dto: CreateTrackDto) {
		return this.trackService.add(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTrackDto) {
		return this.trackService.update(id, dto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	delete(@Param('id', ParseUUIDPipe) id: string) {
		return this.trackService.delete(id);
	}
}
