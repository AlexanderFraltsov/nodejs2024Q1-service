import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserResponseDto } from 'src/model';
import { AuthService } from './auth.service';
import { LoginDto, TokensDto, RefreshDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'Created user',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @ApiOkResponse({
    type: TokensDto,
    description: 'Access and refresh tokens',
  })
  @ApiBadRequestResponse({ description: 'Dto is invalid' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOkResponse({
    type: TokensDto,
    description: 'Access and refresh tokens',
  })
  @ApiUnauthorizedResponse({ description: 'Dto is invalid' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
