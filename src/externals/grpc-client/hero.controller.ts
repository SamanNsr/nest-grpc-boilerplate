import { Metadata } from '@grpc/grpc-js';
import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  HeroServiceControllerMethods,
  HeroServiceClient,
  Hero,
  HeroById,
  HERO_SERVICE_NAME,
} from '../../interfaces/pb/hero';
import { HeroService } from './hero.service';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('hero')
@HeroServiceControllerMethods()
@UseInterceptors(ClassSerializerInterceptor)
export class HeroController implements HeroServiceClient, OnModuleInit {
  private heroService: HeroServiceClient
  constructor(@Inject('hero') private client: ClientGrpc) { }
  onModuleInit() {
    this.heroService = this.client.getService<HeroServiceClient>(HERO_SERVICE_NAME)
  }

  unaryCall(request: HeroById, metadata: Metadata): Observable<Hero> {
    return this.heroService.unaryCall(request, metadata)
  }

  serverStreamAsObservable(
    request: HeroById,
    metadata: Metadata,
  ): Observable<Hero> {
    return this.heroService.serverStreamAsObservable(request, metadata)
  }

  clientStreamAsObservable(
    request: Observable<HeroById>,
    metadata: Metadata,
  ): Observable<Hero> {
    return this.heroService.clientStreamAsObservable(request, metadata)
  }

  bidirectionalStreamAsObservable(
    request: Observable<HeroById>,
    metadata: Metadata,
  ): Observable<Hero> {
    return this.heroService.bidirectionalStreamAsObservable(request, metadata)
  }
}
