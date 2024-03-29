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
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto, IAlbum, UpdateAlbumDto } from 'src/model';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@ApiTags('Album')
@UseGuards(AuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): Promise<IAlbum[]> {
    return this.albumService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IAlbum> {
    return this.albumService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.add(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.delete(id);
  }
}
