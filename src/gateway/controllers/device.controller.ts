import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Device } from "@prisma/client";
import { AuthGuard } from "src/auth/middleware/auth.guard";
import { IdNumberInputDto, IdStringInputDto } from "src/common/dtos/id-input.dto";
import { RequestProcessorService } from "src/common/services/request-processor.service";
import { DeviceCreateDto, DeviceEditDto, DeviceOutputDto } from "../dtos/device.dto";
import { DeviceService } from "../services/device-service";
import { GatewayService } from "../services/gateway-service";

@Controller("device")
@ApiTags("device")
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
        return this.requestProcessor.processRequest(input, DeviceCreateDto, () => this.deviceService.create(input))
    }

    @Post("edit")
    @ApiCreatedResponse({
        type: DeviceOutputDto,
    })
    edit(@Body() input: DeviceEditDto): Promise<Device> {
        return this.requestProcessor.processRequest(input, DeviceEditDto, () => this.deviceService.edit(input))
    }

    @Post("detail")
    @ApiCreatedResponse({
        type: DeviceOutputDto,
    })
    detail(@Body() input: IdNumberInputDto): Promise<Device> {
        return this.requestProcessor.processRequest(input, IdNumberInputDto, () => this.deviceService.detail(input.id))
    }

    @Post("remove")
    @ApiCreatedResponse({
        type: DeviceOutputDto,
    })
    remove(@Body() input: IdNumberInputDto): Promise<Device> {
        return this.requestProcessor.processRequest(input, IdNumberInputDto, () => this.deviceService.remove(input.id))
    }

    @ApiCreatedResponse({
        type: [DeviceOutputDto],
    })
    @Post("list")
    list(@Body() input: IdStringInputDto): Promise<Device[]> {
        return this.requestProcessor.processRequest(input, IdStringInputDto, () => this.deviceService.listGatewayDevices(input.id))
    }
}