import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
		const ALLOWED_PATHS = [
			{ method: 'GET', url: '/' },
			{ method: 'GET', url: '/doc' },
			{ method: 'POST', url: '/auth/login' },
			{ method: 'POST', url: '/auth/signup' },
			{ method: 'POST', url: '/auth/refresh' },
		];
		const { route: { path }, method } = request;

		if (ALLOWED_PATHS.some((allowedPath) => method === allowedPath.method && path ===	allowedPath.url)) {
			return true;
		}
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: any = await this.jwtService.verifyAsync(token);

      if (!payload.userId || !payload.login) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
