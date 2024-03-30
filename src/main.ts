import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggingService } from './modules/logger/logging.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './modules/logger/logging.interceptor';
import { AuthGuard } from './modules/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  // Command: call unhandledRejection
  // (async () => {throw new Error('Some error')})()

  // Command:  call uncaughtException
  // setImmediate(() => {
  // 	throw new Error('Some error');
  // })

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught exception | ${err}`);
  });

  process.on('unhandledRejection', async (reason) => {
    logger.error(`Unhandled promise rejection | ${reason}`);
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const port = configService.get('port');
  app.useLogger(new LoggingService());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new LoggingInterceptor());
	app.useGlobalGuards(new AuthGuard(jwtService));

  // const yamlFile = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), {
  //   encoding: 'utf-8',
  // });
  // const document = parse(yamlFile);
  const config = new DocumentBuilder()
    .setTitle('Nodejs service')
    .setDescription('Nodejs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  const SWAGGER_PATH = '/doc';
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(port);

  logger.log(`The application is running on the port: ${port}`);
  logger.log(
    `The swagger available on http://localhost:${port}${SWAGGER_PATH}`,
  );
}
bootstrap();
