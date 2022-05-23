import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const protoDir = join(__dirname, '../protos');

export const grpcClientOptions = (port: string): ClientOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      package: ['health.v1', 'hero'],
      protoPath: [protoDir + '/health.v1.proto', protoDir + '/hero.proto'],
    },
  };
};
