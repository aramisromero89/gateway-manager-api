import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DeviceController } from 'src/gateway/controllers/device.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { devices, gateways } from 'src/test-data';
import { GatewayController } from './gateway.controller';
import { GatewayService } from '../services/gateway-service';

describe('GatewayController', () => {
    let gatewayController: GatewayController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).overrideProvider(GatewayService).useValue({
            list: (_: any) => { return { items: gateways, count: 2 } }
        }).compile();

        gatewayController = app.get<GatewayController>(GatewayController);
    });

    describe('List', () => {
        it('First element should have name "g1" ', async () => {
            let res = await gatewayController.list({ count: 2, page: 0 })

            expect(res.items[0].name).toEqual("g1");
        });
    });
});

