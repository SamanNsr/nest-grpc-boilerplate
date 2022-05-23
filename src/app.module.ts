import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { CoreModule } from './core/core.module';
import { MongooseModule as ExtendedMongooseModule } from './providers/mongoose/mongoose.module';
import { RedisCacheModule } from './providers/redis-cache/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    RedisCacheModule,
    ExtendedMongooseModule,
    CoreModule,
    CommonModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
