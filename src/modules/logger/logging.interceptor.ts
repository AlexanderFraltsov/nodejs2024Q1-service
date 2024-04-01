import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    this.logRequest(context);

    return next.handle().pipe(
      tap((data) => {
        this.logResponse(context, data);
      }),
    );
  }

  private logRequest(context: ExecutionContext) {
    const { method, params, route, query, body } = context
      .switchToHttp()
      .getRequest();
    let request = `Request: ${method}: ${route.path}`;
    if (Object.keys(params).length) {
      request += ` | params: ${JSON.stringify(params)}`;
    }
    if (Object.keys(query).length) {
      request += ` | query: ${JSON.stringify(query)}`;
    }
    if (Object.keys(body).length) {
      request += ` | body: ${JSON.stringify(body)}`;
    }
    this.logger.debug(request);
  }

  private logResponse(context: ExecutionContext, data: any) {
    const { statusCode } = context.switchToHttp().getResponse();
    let response = `Response: ${statusCode}`;
    if (data) {
      response += ` | ${JSON.stringify(data)}`;
    }
    this.logger.debug(response);
  }
}
