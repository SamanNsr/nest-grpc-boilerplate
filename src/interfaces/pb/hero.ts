/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'hero';

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export const HERO_PACKAGE_NAME = 'hero';

export interface HeroServiceClient {
  /** Unary Call */

  unaryCall(request: HeroById, metadata?: Metadata): Observable<Hero>;

  /** Client Streaming */

  clientStreamAsObservable(
    request: Observable<HeroById>,
    metadata?: Metadata,
  ): Observable<Hero>;

  /** Server Streaming */

  serverStreamAsObservable(
    request: HeroById,
    metadata?: Metadata,
  ): Observable<Hero>;

  /** Duplex Streaming */

  bidirectionalStreamAsObservable(
    request: Observable<HeroById>,
    metadata?: Metadata,
  ): Observable<Hero>;
}

export interface HeroServiceController {
  /** Unary Call */

  unaryCall(
    request: HeroById,
    metadata?: Metadata,
  ): Promise<Hero> | Observable<Hero> | Hero;

  /** Client Streaming */

  clientStreamAsObservable(
    request: Observable<HeroById>,
    metadata?: Metadata,
  ): Promise<Hero> | Observable<Hero> | Hero;

  /** Server Streaming */

  serverStreamAsObservable(
    request: HeroById,
    metadata?: Metadata,
  ): Observable<Hero>;

  /** Duplex Streaming */

  bidirectionalStreamAsObservable(
    request: Observable<HeroById>,
    metadata?: Metadata,
  ): Observable<Hero>;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['unaryCall', 'serverStreamAsObservable'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('HeroService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [
      'clientStreamAsObservable',
      'bidirectionalStreamAsObservable',
    ];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('HeroService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const HERO_SERVICE_NAME = 'HeroService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
