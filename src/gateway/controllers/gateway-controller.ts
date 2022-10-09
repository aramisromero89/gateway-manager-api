import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse,ApiTags } from "@nestjs/swagger";
import { Gateway } from "@prisma/client";
import { IdStringInputDto } from "src/common/dtos/id-input.dto";
import { RequestProcessorService } from "src/common/services/request-processor.service";
import { DeviceCreateDto } from "../dtos/device.dto";
import { GatewayDataDto, GatewayEditDto, GatewayListInputDto, GatewayListOutputDto, GatewayOutputDto } from "../dtos/gateway.dto";
import { GatewayService } from "../services/gateway-service";

@Controller("gateway")
@ApiTags("gateway")
export class GatewayController {
    constructor(
        private readonly gatewayService: GatewayService,
        private readonly requestProcessor: RequestProcessorService
    ) { }

    @Post("create")
    @ApiCreatedResponse({
        type: GatewayOutputDto,
    })
    create(@Body() input: GatewayDataDto): Promise<Gateway> {
        return this.requestProcessor.processRequest(input, GatewayDataDto, () => this.gatewayService.createGateway(input))
    }

    @Post("edit")
    @ApiCreatedResponse({
        type: GatewayOutputDto,
    })
    edit(@Body() input: GatewayEditDto): Promise<Gateway> {
        return this.requestProcessor.processRequest(input, GatewayEditDto, () => this.gatewayService.editGateway(input))
    }

    @Post("detail")
    @ApiCreatedResponse({
        type: GatewayOutputDto,
    })
    detail(@Body() input: IdStringInputDto): Promise<Gateway> {
        return this.requestProcessor.processRequest(input, IdStringInputDto, () => this.gatewayService.details(input.id))
    }

    @Post("list")
    @ApiCreatedResponse({
        type: GatewayListOutputDto,
    })
    list(@Body() input: GatewayListInputDto): Promise<GatewayListOutputDto> {
        return this.requestProcessor.processRequest(input, GatewayListInputDto, () => this.gatewayService.list(input))
    }
}