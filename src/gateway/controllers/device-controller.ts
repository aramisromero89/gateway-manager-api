import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Device } from "@prisma/client";
import { RequestProcessorService } from "src/common/services/request-processor.service";
import { DeviceCreateDto, DeviceEditDto, DeviceOutputDto } from "../dtos/device.dto";
import { DeviceService } from "../services/device-service";
import { GatewayService } from "../services/gateway-service";

@Controller("device")
@ApiTags("device")
export class DeviceController {
    constructor(
        private readonly deviceService: DeviceService,
        private readonly requestProcessor: RequestProcessorService
    ) { }

    @Post("create")
    @ApiCreatedResponse({
        type: DeviceOutputDto,
    })
    create(@Body() input: DeviceCreateDto): Promise<Device> {
        return this.requestProcessor.processRequest(input, DeviceCreateDto, () => this.deviceService.createDevice(input))
    }

    @Post("edit")
    @ApiCreatedResponse({
        type: DeviceOutputDto,
    })
    edit(@Body() input: DeviceEditDto): Promise<Device> {
        return this.requestProcessor.processRequest(input, DeviceEditDto, () => this.deviceService.editDevice(input))
    }

    @ApiCreatedResponse({
        type: [DeviceOutputDto],
    })
    @Post("list")
    list(@Body() input: { gateawayId: string }): Promise<Device[]> {
        return this.requestProcessor.processRequest(input, DeviceEditDto, () => this.deviceService.listGatewayDevices(input.gateawayId))
    }
}