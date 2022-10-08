import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { RequestProcessorService } from './services/request-processor.service';

@Module({
    providers: [PrismaService,RequestProcessorService],
    exports: [PrismaService,RequestProcessorService],
})
export class CommonModule { }
