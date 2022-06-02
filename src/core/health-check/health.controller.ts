import { Controller, Inject, Logger, LoggerService } from '@nestjs/common';

import {
  HealthCheckResponse,
  HealthController as GrpcHealthController,
  HealthCheckResponse_ServingStatus,
  HealthControllerMethods,
} from 'src/interfaces/pb/health.v1';

@Controller('health.v1')
@HealthControllerMethods()
export class HealthController implements GrpcHealthController {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  check(): HealthCheckResponse {
    this.logger.log('Health check');
    return {
      status: HealthCheckResponse_ServingStatus.SERVING,
    };
  }
}
