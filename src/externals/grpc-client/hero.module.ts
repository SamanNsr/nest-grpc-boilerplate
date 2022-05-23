import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HeroService } from './hero.service';

@Module({
  imports: [ConfigModule],
  controllers: [HeroController],
  providers: [
    {
      provide: 'HERO_PACKAGE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'hero',
            protoPath: join(__dirname, '../../../protos/hero.proto'),
            url: configService.get('GRPC_HERO_SERVICE_CONNECTION_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
    HeroService,
  ],
})
export class SubscribersModule {}
