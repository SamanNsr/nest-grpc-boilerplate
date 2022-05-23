import {
  Controller,
  Inject,
  Logger,
  LoggerService,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  HeroById,
  HeroServiceController,
  Hero,
  HeroServiceControllerMethods,
} from '../../interfaces/pb/hero';

import { HeroService } from './hero.service';
import { GrpcAuthGuard } from 'src/common/guards/grpcAuth.guard';
import { ExtendedRpcExceptionsFilter } from 'src/common/filters/extended-rpc-execptions.filter';

@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private HeroService: HeroService,
  ) {}

  @UseGuards(GrpcAuthGuard)
  @UseFilters(ExtendedRpcExceptionsFilter)
  unaryCall(data: HeroById): Hero {
    this.logger.error('HeroService.UnaryCall received %o', data);
    const item = this.HeroService.getHeroBiyId(data.id);
    this.logger.error('HeroService.UnaryCall responses %o', item);
    return item;
  }

  clientStreamAsObservable(data$: Observable<HeroById>): Observable<Hero> {
    return this.HeroService.getHeroByClientStream(data$);
  }

  serverStreamAsObservable(request: HeroById): Observable<Hero> {
    return this.HeroService.serverStreamHeros(request);
  }

  bidirectionalStreamAsObservable(
    data$: Observable<HeroById>,
  ): Observable<Hero> {
    return this.HeroService.bidiStreamHeros(data$);
  }
}
