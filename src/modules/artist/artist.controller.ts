import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto, IArtist, UpdateArtistDto } from 'src/model';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): Promise<IArtist[]> {
    return this.artistService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IArtist> {
    return this.artistService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.add(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.delete(id);
  }
}
