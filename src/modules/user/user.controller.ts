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
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  CreateUserDto,
  IUser,
  UpdateUserDto,
  UserResponseDto,
} from 'src/model';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unautorized' })
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserResponseDto,
    isArray: true,
    description: 'Users',
  })
  @Get()
  getAll(): Promise<IUser[]> {
    return this.userService.getAll();
  }

  @ApiOkResponse({
    type: UserResponseDto,
    description: 'User',
  })
  @ApiBadRequestResponse({ description: 'User id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'User id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    return this.userService.getOneById(id);
  }

  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'The user has been created',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.add(dto);
  }

  @ApiOkResponse({
    type: UserResponseDto,
    description: 'The user has been updated',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'User id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.changePassword(id, dto);
  }

  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({ description: 'User id is invalid' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiParam({
    description: 'User id',
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
