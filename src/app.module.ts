import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [CommonModule, GatewayModule]
})
export class AppModule {}
