import { Module, Logger } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  providers: [Logger],
  controllers: [HealthController],
})
export class HealthModule {}
