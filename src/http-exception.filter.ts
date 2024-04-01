import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Request } from 'express';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('RequestError');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const respData = JSON.stringify(exception.getResponse());

      // this.logger.warn(
      //   `${request.method} ${request.url} ${status} - ${exception.message} - ${respData}`,
      // );
    } else {
      const message =
        exception instanceof Error ? exception.message : exception;

      // this.logger.warn(`${request.method} ${request.url} - ${message}`);
    }
    super.catch(exception, host);
  }
}
