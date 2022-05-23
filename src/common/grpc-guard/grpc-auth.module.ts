import { Module } from '@nestjs/common';
import { ExternalServiceManagerModule } from 'src/externals/service-manager/service-manager.module';
import { ExternalUserManagementModule } from 'src/externals/user-management/user-management.module';

import { GrpcAuthGuard } from './grpc-auth.guard';

@Module({
  imports: [ExternalUserManagementModule, ExternalServiceManagerModule],
  providers: [GrpcAuthGuard],
  exports: [GrpcAuthGuard],
})
export class GrpcAuthModule {}
