import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	signup(@Body() dto: SignupDto) {
		return this.authService.signup(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	refresh(@Body() dto: RefreshDto) {
		return this.authService.refresh(dto);
	}
}
