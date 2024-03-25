import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  const yamlFile = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), {
    encoding: 'utf-8',
  });
  const document = parse(yamlFile);

  const SWAGGER_PATH = '/api';
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(port);

  logger.log(`The application is running on the port: ${port}`);
  logger.log(
    `The swagger available on http://localhost:${port}${SWAGGER_PATH}`,
  );
}
bootstrap();
