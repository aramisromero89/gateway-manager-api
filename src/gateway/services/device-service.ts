import { Injectable } from "@nestjs/common";
import { Device, Gateway } from "@prisma/client";
import { PrismaService } from "src/common/services/prisma.service";
import { DeviceCreateDto, DeviceEditDto } from "../dtos/device.dto";
@Injectable()
export class DeviceService {
    
    constructor(private readonly prisma: PrismaService) { }

    createDevice(input: DeviceCreateDto): Promise<Device> {
        return this.prisma.device.create({
            data: {
                status: input.status,
                vendor: input.vendor,
                Gateway: {
                    connect: {
                        serialNumber: input.gatewaySerialNumber
                    }
                }
            }
        })
    }
    
    editDevice(input: DeviceEditDto): Promise<Device> {
        return this.prisma.device.update({
            where:{
                id: input.id
            },
            data: {
                status: input.status,
                vendor: input.vendor                
            }
        })
    }

    listGatewayDevices(gatewaySN:string): Promise<Device[]>{
        return this.prisma.device.findMany({
            where:{
                gatewaySerialNumber: gatewaySN
            }
        })
    }

}