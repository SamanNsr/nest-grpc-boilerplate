import { Module } from '@nestjs/common';
import { HealthModule } from './health-check/health.module';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [HealthModule, HeroModule],
  controllers: [],
  providers: [HealthModule, HeroModule],
})
export class CoreModule {}
