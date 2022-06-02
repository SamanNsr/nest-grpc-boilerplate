/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'health.v1';

export interface HealthCheckRequest {
  service: string;
}

export interface HealthCheckResponse {
  status: HealthCheckResponse_ServingStatus;
}

export enum HealthCheckResponse_ServingStatus {
  UNKNOWN = 0,
  SERVING = 1,
  NOT_SERVING = 2,
  UNRECOGNIZED = -1,
}

export const HEALTH_V1_PACKAGE_NAME = 'health.v1';

export interface HealthClient {
  check(
    request: HealthCheckRequest,
    metadata?: Metadata,
  ): Observable<HealthCheckResponse>;
}

export interface HealthController {
  check(
    request: HealthCheckRequest,
    metadata?: Metadata,
  ):
    | Promise<HealthCheckResponse>
    | Observable<HealthCheckResponse>
    | HealthCheckResponse;
}

export function HealthControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['check'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Health', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('Health', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const HEALTH_SERVICE_NAME = 'Health';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
