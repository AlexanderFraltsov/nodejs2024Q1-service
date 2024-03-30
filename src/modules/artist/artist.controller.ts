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
  ArtistResponseDto,
  CreateArtistDto,
  IArtist,
  UpdateArtistDto,
} from 'src/model';
import { ArtistService } from './artist.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOkResponse({
    type: ArtistResponseDto,
    isArray: true,
    description: 'Artists',
  })
  @Get()
  getAll(): Promise<IArtist[]> {
    return this.artistService.getAll();
  }

  @ApiOkResponse({
    type: ArtistResponseDto,
    description: 'Artist',
  })
  @ApiBadRequestResponse({ description: 'Artist id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Artist id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IArtist> {
    return this.artistService.getOneById(id);
  }

  @ApiCreatedResponse({
    type: ArtistResponseDto,
    description: 'The artist has been created',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.add(dto);
  }

  @ApiOkResponse({
    type: ArtistResponseDto,
    description: 'The artist has been updated',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Artist id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(id, dto);
  }

  @ApiNoContentResponse({ description: 'The artist has been deleted' })
  @ApiBadRequestResponse({ description: 'Artist id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Artist id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.delete(id);
  }
}
