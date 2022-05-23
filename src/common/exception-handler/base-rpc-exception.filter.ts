import {
  ArgumentsHost,
  Logger,
  RpcExceptionFilter as NestRpcExceptionFilter,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { MESSAGES } from '@nestjs/core/constants';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '../../utils/rpc-exception';

export class BaseRpcExceptionFilter<T = unknown, R = unknown>
  implements NestRpcExceptionFilter<T>
{
  private static readonly logger = new Logger('RpcExceptionsHandler');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public catch(exception: T, _host: ArgumentsHost): Observable<R> {
    const status = 'error';
    const logger = BaseRpcExceptionFilter.logger;
    logger.error(exception);
    if (!(exception instanceof RpcException)) {
      return this.handleUnknownError(exception, status);
    }
    const code = exception.getCode();
    const message = exception.getMessage();
    const err = { message, code };
    return throwError(() => err);
  }

  public handleUnknownError(exception: T, status: string) {
    const errorMessage = MESSAGES.UNKNOWN_EXCEPTION_MESSAGE;

    const loggerArgs = this.isError(exception)
      ? [exception.message, exception.stack]
      : [exception];
    const logger = BaseRpcExceptionFilter.logger;
    // eslint-disable-next-line prefer-spread
    logger.error.apply(logger, loggerArgs as any);

    return throwError(() => ({ status, message: errorMessage }));
  }

  public isError(exception: unknown): exception is Error {
    return !!(isObject(exception) && (exception as Error).message);
  }
}
