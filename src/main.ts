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
import { CustomLogger } from './modules/custom-logger/custom-logger.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
	app.useLogger(new CustomLogger());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  const yamlFile = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), {
		encoding: 'utf-8',
  });
  const document = parse(yamlFile);

  const SWAGGER_PATH = '/doc';
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(port);

	const logger = new Logger('bootstrap');
  logger.log(`The application is running on the port: ${port}`);
  logger.log(
    `The swagger available on http://localhost:${port}${SWAGGER_PATH}`,
  );
}
bootstrap();
