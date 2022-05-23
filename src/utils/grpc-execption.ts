import { status } from '@grpc/grpc-js';
import { RpcException } from './rpc-exception';

export class GrpcCanceledException extends RpcException {
  public constructor(error: string | object) {
    super(status.CANCELLED, error);
  }
}

export class GrpcUnkownException extends RpcException {
  public constructor(error: string | object) {
    super(status.UNKNOWN, error);
  }
}

export class GrpcInvalidArgumentException extends RpcException {
  public constructor(error: string | object) {
    super(status.INVALID_ARGUMENT, error);
  }
}

export class GrpcDeadlineExceededException extends RpcException {
  public constructor(error: string | object) {
    super(status.DEADLINE_EXCEEDED, error);
  }
}

export class GrpcNotFoundException extends RpcException {
  public constructor(error: string | object) {
    super(status.NOT_FOUND, error);
  }
}

export class GrpcAlreadyExistException extends RpcException {
  public constructor(error: string | object) {
    super(status.ALREADY_EXISTS, error);
  }
}

export class GrpcPermissionDeniedException extends RpcException {
  public constructor(error: string | object) {
    super(status.PERMISSION_DENIED, error);
  }
}

export class GrpcUnauthenticatedException extends RpcException {
  public constructor(error: string | object) {
    super(status.UNAUTHENTICATED, error);
  }
}

export class GrpcRessourceExhaustedException extends RpcException {
  public constructor(error: string | object) {
    super(status.RESOURCE_EXHAUSTED, error);
  }
}

export class GrpcFailedPreconditionException extends RpcException {
  public constructor(error: string | object) {
    super(status.FAILED_PRECONDITION, error);
  }
}

export class GrpcAbortedException extends RpcException {
  public constructor(error: string | object) {
    super(status.ABORTED, error);
  }
}

export class GrpcOutOfRangeException extends RpcException {
  public constructor(error: string | object) {
    super(status.OUT_OF_RANGE, error);
  }
}

export class GrpcUnimplementedException extends RpcException {
  public constructor(error: string | object) {
    super(status.UNIMPLEMENTED, error);
  }
}

export class GrpcInternalException extends RpcException {
  public constructor(error: string | object) {
    super(status.INTERNAL, error);
  }
}

export class GrpcUnavailableException extends RpcException {
  public constructor(error: string | object) {
    super(status.UNAVAILABLE, error);
  }
}

export class GrpcDataLossException extends RpcException {
  public constructor(error: string | object) {
    super(status.DATA_LOSS, error);
  }
}
