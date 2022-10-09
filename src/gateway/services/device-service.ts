import { Injectable } from "@nestjs/common";
import { Device, Gateway } from "@prisma/client";
import { IdNumberInputDto } from "src/common/dtos/id-input.dto";
import { PrismaService } from "src/common/services/prisma.service";
import { DeviceCreateDto, DeviceEditDto } from "../dtos/device.dto";
@Injectable()
export class DeviceService {
    
    constructor(private readonly prisma: PrismaService) { }

    create(input: DeviceCreateDto): Promise<Device> {
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
    
    edit(input: DeviceEditDto): Promise<Device> {
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

    remove(id: number): Promise<Device> {
        return this.prisma.device.delete({
            where:{
                id: id
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