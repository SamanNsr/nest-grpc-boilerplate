import { RpcExceptionFilterMetadata } from '@nestjs/common/interfaces/exceptions';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { InvalidExceptionFilterException } from '@nestjs/core/errors/exceptions/invalid-exception-filter.exception';
import { Observable } from 'rxjs';
import { RpcException } from 'src/utils/rpc-exception';
import { BaseRpcExceptionFilter } from './base-rpc-exception.filter';

export class ExtendedRpcExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Observable<any> {
    return super.catch(exception, host);
  }
}
