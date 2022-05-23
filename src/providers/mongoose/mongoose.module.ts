import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestMongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('MONGODB_URL'),
        };
      },
      connectionName: 'heros',
      inject: [ConfigService],
    }),
    // You can add more connection here
  ],
  providers: [NestMongooseModule],
  exports: [NestMongooseModule],
})
export class MongooseModule {}

// With this setup, you have to tell the MongooseModule.forFeature() function which connection should be used.
