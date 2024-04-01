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
  CreateTrackDto,
  ITrack,
  TrackResponseDto,
  UpdateTrackDto,
} from 'src/model';
import { TrackService } from './track.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOkResponse({
    type: TrackResponseDto,
    isArray: true,
    description: 'Tracks',
  })
  @Get()
  getAll(): Promise<ITrack[]> {
    return this.trackService.getAll();
  }

  @ApiOkResponse({
    type: TrackResponseDto,
    description: 'Track',
  })
  @ApiBadRequestResponse({ description: 'Track id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Track id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<ITrack> {
    return this.trackService.getOneById(id);
  }

  @ApiCreatedResponse({
    type: TrackResponseDto,
    description: 'The track has been created',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.add(dto);
  }

  @ApiOkResponse({
    type: TrackResponseDto,
    description: 'The track has been updated',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Track id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto);
  }

  @ApiNoContentResponse({ description: 'The track has been deleted' })
  @ApiBadRequestResponse({ description: 'Track id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'Track id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.delete(id);
  }
}
