import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [AuthModule,CommonModule, GatewayModule]
})
export class AppModule {}
