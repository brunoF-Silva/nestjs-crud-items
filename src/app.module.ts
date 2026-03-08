import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DemoResetModule } from './demo-reset/demo-reset.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from 'src/database/prisma.service'


@Module({
  imports: [
    ScheduleModule.forRoot(), // This enables the @Cron decorators to work
    DemoResetModule,
    ConfigModule.forRoot({
      isGlobal: true, // This makes the .env file globally available
    }),
    ItemsModule,
    UsersModule,
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
