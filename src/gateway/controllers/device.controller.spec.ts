import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DeviceController } from 'src/gateway/controllers/device.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { devices } from 'src/test-data';

describe('DeviceController', () => {
    let deviceController: DeviceController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).overrideProvider(PrismaService).useValue({
            device: { findMany: (_: any)=> devices }
        }).compile();

        deviceController = app.get<DeviceController>(DeviceController);
    });

    describe('List', () => {
        it('Should return list with length 2"', async () => {
            let res = await deviceController.list({ id: "a" })
            expect(res).toHaveLength(2);
        });
    });
});

