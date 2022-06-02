import { Module, Logger } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  controllers: [HeroController],
  providers: [HeroService, Logger],
})
export class HeroModule {}
