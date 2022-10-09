import { Gateway, Device } from "@prisma/client";

export const gateways: Gateway[] = [
    {
        address: "1.1.1.1",
        name: "g1",
        serialNumber: "1"
    },
    {
        address: "1.1.1.2",
        name: "g2",
        serialNumber: "2"
    }
]

export const devices: Device[] = [
    {
        id: 1,
        date: new Date(),
        gatewaySerialNumber: "2",
        status: "online",
        vendor: "v1"
    },
    {
        id: 2,
        date: new Date(),
        gatewaySerialNumber: "2",
        status: "online",
        vendor: "v1"
    },
]