import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { grpcClientOptions } from './grpc-client';

async function bootstrap() {
  // create a 'dummy' app to be able to get a reference to the config service
  const configApp = await NestFactory.create(AppModule);
  const configService = configApp.get(ConfigService);
  const port = configService.get('port');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcClientOptions(port),
  );
  await app.listen();

  const logger = app.get(Logger);
  logger.log(`Application is running on: port ${port}`);
}
bootstrap();
