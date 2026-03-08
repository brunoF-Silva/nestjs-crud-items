import { Module } from '@nestjs/common';
import { DemoResetService } from './demo-reset.service';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DemoResetService],
})
export class DemoResetModule {}