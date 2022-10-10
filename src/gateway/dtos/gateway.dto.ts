import { IsIP, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"
import { DeviceDataDto } from "./device.dto"

export class GatewayDataDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsIP(4)
    address: string
}

export class GatewayEditDto extends GatewayDataDto {
    @IsNotEmpty()
    @IsString()
    serialNumber: string
}

export class GatewayOutputDto extends GatewayEditDto {
    devicesCount?: number
}

export class GatewayListInputDto {
    @IsNotEmpty()
    @Max(10)
    @Min(1)
    @IsNumber()
    count: number

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    page: number

}

export class GatewayListOutputDto {
    total: number

    items: GatewayOutputDto[]

}