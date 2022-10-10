import { Injectable } from "@nestjs/common";
import { Device, Gateway } from "@prisma/client";
import { PrismaService } from "src/common/services/prisma.service";
import { GatewayDataDto, GatewayEditDto, GatewayListInputDto, GatewayListOutputDto, GatewayOutputDto } from "../dtos/gateway.dto";

@Injectable()
export class GatewayService {
    constructor(private readonly prisma: PrismaService) { }

    create(input: GatewayDataDto): Promise<Gateway> {
        return this.prisma.gateway.create({
            data: {
                address: input.address,
                name: input.name,
            }
        })
    }

    edit(input: GatewayEditDto): Promise<Gateway> {
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

    details(id: string): Promise<Gateway> {
        return this.prisma.gateway.findUnique({
            where: {
                serialNumber: id
            }
        })
    }

    remove(id: string): Promise<Gateway> {
        return this.prisma.gateway.delete({
            where: {
                serialNumber: id
            }
        })
    }

    async list(input: GatewayListInputDto): Promise<GatewayListOutputDto> {
        const [count, items] = await this.prisma.$transaction([
            this.prisma.gateway.count(),
            this.prisma.gateway.findMany({
                skip: input.count * (input.page - 1),
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