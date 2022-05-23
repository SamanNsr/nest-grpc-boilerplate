import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  Inject,
  applyDecorators,
  UseGuards,
} from '@nestjs/common';
import { GrpcUnauthenticatedException } from '../../utils/grpc-execption';
import { Reflector } from '@nestjs/core';
import { ExternalUserManagementService } from 'src/externals/user-management/user-management.service';
import { ExternalServiceManagerService } from 'src/externals/service-manager/service-manager.service';

export interface IGrpcAuthGuard {
  userConsumer:
    | {
        id: string;
        name: string;
        email: string;
        phone: string;
        status: string;
        createdAt: string;
        updatedAt: string;
      }
    | undefined;
  serviceConsumer:
    | {
        id: string;
      }
    | undefined;
  isPrivileged: boolean;
}

export function AuthGuard(...rights: string[]) {
  return applyDecorators(
    SetMetadata('rights', rights),
    UseGuards(GrpcAuthGuard),
  );
}
@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(
    @Inject(ExternalUserManagementService)
    private externalUserManagementService: ExternalUserManagementService,
    @Inject(Reflector) private reflector: Reflector,
    private externalServiceManagerService: ExternalServiceManagerService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = context.getType();
    const prefix = 'Bearer ';
    const metadata = context.getArgByIndex(1); // metadata
    let userToken: string;
    let serviceToken: string;
    let isPrivileged = false;
    if (type === 'rpc') {
      if (!metadata) {
        throw new GrpcUnauthenticatedException('Please authenticate');
      }
      userToken = metadata.get('Authorization')[0];
      serviceToken = metadata.get('ServiceAuthorization')[0];
    }

    if (
      (!userToken || !userToken.includes(prefix)) &&
      (!serviceToken || !serviceToken.includes(prefix))
    ) {
      throw new GrpcUnauthenticatedException('Please authenticate');
    }

    userToken = !!userToken && userToken.slice(userToken.indexOf(' ') + 1);
    serviceToken =
      !!serviceToken && serviceToken.slice(serviceToken.indexOf(' ') + 1);

    const requiredRights = this.reflector.get<string[]>(
      'rights',
      context.getHandler(),
    );
    if (userToken) {
      const { userConsumer } =
        await this.externalUserManagementService.authConsumer({
          requiredRights,
          userToken,
        });

      metadata.userConsumer = userConsumer;
    }

    if (serviceToken) {
      const { serviceConsumer } =
        await this.externalServiceManagerService.authConsumer({ serviceToken });
      metadata.serviceConsumer = serviceConsumer;
      isPrivileged = true;
    }

    metadata.isPrivileged = isPrivileged;
    return true;
  }
}
