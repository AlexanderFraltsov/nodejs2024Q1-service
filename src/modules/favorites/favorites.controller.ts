import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
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
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from 'src/model';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOkResponse({
    type: FavoritesResponseDto,
    description: 'Favorites',
  })
  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @ApiCreatedResponse({
    description: 'The album has been added to favorites',
  })
  @ApiBadRequestResponse({ description: 'Id is invalid' })
  @ApiUnprocessableEntityResponse({ description: "Album doesn't exist" })
  @ApiParam({
    description: 'Album id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @ApiNoContentResponse({
    description: 'The album has been deleted from favorites',
  })
  @ApiBadRequestResponse({ description: 'Id is invalid' })
  @ApiNotFoundResponse({ description: 'Album is not favorite' })
  @ApiParam({
    description: 'Album id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @ApiCreatedResponse({
    description: 'The artist has been added to favorites',
  })
  @ApiBadRequestResponse({ description: 'Id is invalid' })
  @ApiUnprocessableEntityResponse({ description: "Artist doesn't exist" })
  @ApiParam({
    description: 'Artist id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @ApiNoContentResponse({
    description: 'The artist has been deleted from favorites',
  })
  @ApiBadRequestResponse({ description: 'Id is invalid' })
  @ApiNotFoundResponse({ description: 'Artist is not favorite' })
  @ApiParam({
    description: 'Artist id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  @ApiCreatedResponse({
    description: 'The track has been added to favorites',
  })
  @ApiBadRequestResponse({ description: 'Id is invalid' })
  @ApiUnprocessableEntityResponse({ description: "Track doesn't exist" })
  @ApiParam({
    description: 'Track id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @ApiNoContentResponse({
    description: 'The track has been deleted from favorites',
  })
  @ApiBadRequestResponse({ description: 'Id is invalid' })
  @ApiNotFoundResponse({ description: 'Track is not favorite' })
  @ApiParam({
    description: 'Track id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteTrack(id);
  }
}
