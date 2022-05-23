import { Catch } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Observable } from 'rxjs';
import { BaseRpcExceptionFilter } from './base-rpc-exception.filter';
@Catch()
export class ExtendedRpcExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Observable<any> {
    return super.catch(exception, host);
  }
}
