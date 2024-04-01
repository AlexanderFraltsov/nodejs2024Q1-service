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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  AlbumResponseDto,
  CreateAlbumDto,
  IAlbum,
  UpdateAlbumDto,
} from 'src/model';
import { AlbumService } from './album.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOkResponse({
    type: AlbumResponseDto,
    isArray: true,
    description: 'Albums',
  })
  @Get()
  getAll(): Promise<IAlbum[]> {
    return this.albumService.getAll();
  }

  @ApiOkResponse({
    type: AlbumResponseDto,
    description: 'Album',
  })
  @ApiBadRequestResponse({ description: 'Album id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Album id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IAlbum> {
    return this.albumService.getOneById(id);
  }

  @ApiCreatedResponse({
    type: AlbumResponseDto,
    description: 'The album has been created',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.add(dto);
  }

  @ApiOkResponse({
    type: AlbumResponseDto,
    description: 'The album has been updated',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Album id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumService.update(id, dto);
  }

  @ApiNoContentResponse({ description: 'The album has been deleted' })
  @ApiBadRequestResponse({ description: 'Album id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Album id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.delete(id);
  }
}
