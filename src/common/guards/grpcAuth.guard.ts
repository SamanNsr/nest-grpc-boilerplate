import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GrpcUnauthenticatedException } from '../../utils/grpc-execption';
import { Observable } from 'rxjs';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const type = context.getType();
    const prefix = 'Bearer ';
    const metadata = context.getArgByIndex(1); // metadata
    let header;
    if (type === 'rpc') {
      if (!metadata) {
        throw new GrpcUnauthenticatedException('Please authenticate');
        return false;
      }
      header = metadata.get('Authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      throw new GrpcUnauthenticatedException('Please authenticate');
      return false;
    }

    // const token = header.slice(header.indexOf(' ') + 1);
    try {
      // TODO: connect with interconnector service
      const consumer = {
        id: 1,
        name: 'John Doe',
        email: '1999saman@gmail.com',
      };

      metadata.consumer = consumer;
      return true;
    } catch (e) {
      throw new GrpcUnauthenticatedException('Please authenticate');
      return false;
    }
  }
}
