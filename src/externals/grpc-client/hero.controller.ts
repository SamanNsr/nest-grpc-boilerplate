import { Metadata } from '@grpc/grpc-js';
import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  HeroServiceControllerMethods,
  HeroServiceClient,
  Hero,
} from '../../interfaces/pb/hero';
import { HeroService } from './hero.service';

@Controller('hero')
@HeroServiceControllerMethods()
@UseInterceptors(ClassSerializerInterceptor)
export class HeroController implements HeroServiceClient {
  constructor(private HeroService: HeroService) {}

  unaryCall(request: HeroById, metadata: Metadata): Observable<Hero> {}

  serverStreamAsObservable(
    request: HeroById,
    metadata: Metadata,
  ): Observable<Hero> {}

  clientStreamAsObservable(
    request: Observable<HeroById>,
    metadata: Metadata,
  ): Promise<Observable<Hero>> {}

  bidirectionalStreamAsObservable(
    request: Observable<HeroById>,
    metadata: Metadata,
  ): Observable<Hero> {}
}
