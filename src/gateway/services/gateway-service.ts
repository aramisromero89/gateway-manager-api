import { Injectable } from "@nestjs/common";
import { Device, Gateway } from "@prisma/client";
import { PrismaService } from "src/common/services/prisma.service";
import { GatewayDataDto, GatewayEditDto, GatewayListInputDto, GatewayListOutputDto, GatewayOutputDto } from "../dtos/gateway.dto";

@Injectable()
export class GatewayService {
    constructor(private readonly prisma: PrismaService) { }

    createGateway(input: GatewayDataDto): Promise<Gateway> {
        return this.prisma.gateway.create({
            data: {
                address: input.address,
                name: input.name,
            }
        })
    }

    editGateway(input: GatewayEditDto): Promise<Gateway> {
        return this.prisma.gateway.update({
            where: {
                serialNumber: input.serialNumber
            },
            data: {
                address: input.address,
                name: input.name,
            }
        })
    }

    details(id: string): Promise<GatewayOutputDto> {
        return this.prisma.gateway.findUnique({
            where: {
                serialNumber: id
            }
        })
    }


    async list(input: GatewayListInputDto): Promise<GatewayListOutputDto> {
        const [count, items] = await this.prisma.$transaction([
            this.prisma.gateway.count(),
            this.prisma.gateway.findMany({
                skip: input.count * input.page,
                take: input.count,
                select: {
                    address: true,
                    name: true,
                    serialNumber: true,
                    _count: {
                        select: { devices: true }
                    }
                },
                orderBy: {
                    name: "asc"
                }
            })
        ])
        return {
            items: items.map<GatewayOutputDto>((e) => {
                return {
                    serialNumber: e.serialNumber,
                    address: e.address,
                    name: e.name,
                    devicesCount: e._count.devices
                }
            }),
            total: count
        }
    }
}