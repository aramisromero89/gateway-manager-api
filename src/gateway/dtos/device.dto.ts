import { ApiProperty } from "@nestjs/swagger"
import { DeviceStatus } from "@prisma/client"
import { IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class DeviceDataDto {
    @IsNotEmpty()
    @IsString()
    vendor: string

    @IsNotEmpty()
    @IsEnum(DeviceStatus)
    @ApiProperty({ enum: DeviceStatus })
    status: keyof typeof DeviceStatus
}

export class DeviceCreateDto extends DeviceDataDto {
    @IsNotEmpty()
    @IsString()
    gatewaySerialNumber: string
}

export class DeviceEditDto extends DeviceDataDto {
    @IsNotEmpty()
    @IsNumber()
    id: number
}

export class DeviceOutputDto extends DeviceEditDto {
    date: Date
    gatewaySerialNumber: string  
}