import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DeviceController } from './controllers/device-controller';
import { GatewayController } from './controllers/gateway-controller';
import { DeviceService } from './services/device-service';
import { GatewayService } from './services/gateway-service';

@Module({
    imports:[CommonModule],
    providers:[GatewayService,DeviceService],
    controllers:[GatewayController,DeviceController]
})
export class GatewayModule {}
