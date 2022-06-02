import { Module } from '@nestjs/common';

import { ExtendedRpcExceptionsFilter } from './filters/extended-rpc-execptions.filter';
import { GrpcAuthGuard } from './guards/grpcAuth.guard';

@Module({
  imports: [],
  exports: [GrpcAuthGuard, ExtendedRpcExceptionsFilter],
  providers: [GrpcAuthGuard, ExtendedRpcExceptionsFilter],
  controllers: [],
})
export class CommonModule {}
