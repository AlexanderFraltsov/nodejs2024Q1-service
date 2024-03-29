import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../user/user.service';
import { LoginDto, RefreshDto, SignupDto } from './dto';
import { compareWithHashed } from 'src/utils';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signup(query: SignupDto) {
		return await this.userService.add(query);
	}

	async login(query: LoginDto) {
		const user = await this.userService.getOneByLogin(query.login);
		const isPasswordMatch = await compareWithHashed(query.password, user.password);
		if (!isPasswordMatch) {
			throw new NotFoundException("User doesn't exist!");
		}
		const payload = { userId: user.id, login: user.login };
		return {
			accessToken: await this.jwtService.signAsync(payload),
			refreshToken: await this.jwtService.signAsync(payload, {
				expiresIn: this.configService.get('jwt.refreshExpiresIn'),
				secret: this.configService.get('jwt.refreshSecret'),
			}),
		};
	}

	async refresh(query: RefreshDto) {
		if (!query.refreshToken) {
			throw new UnauthorizedException('No refreshToken in body');
		}
		try {
			const { userId, login } = await this.jwtService.verifyAsync(query.refreshToken);
			const payload = { userId, login };
			return {
				accessToken: await this.jwtService.signAsync(payload),
				refreshToken: await this.jwtService.signAsync(payload, {
					expiresIn: this.configService.get('jwt.refreshExpiresIn'),
					secret: this.configService.get('jwt.refreshSecret'),
				}),
			};
		} catch (error) {
			throw new ForbiddenException();
		}
	}
}
