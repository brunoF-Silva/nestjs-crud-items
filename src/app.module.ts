import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 1. Importe o ConfigModule

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from 'src/database/prisma.service'


@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true, // <-- Isso torna o .env disponível globalmente
  }),
  ItemsModule,
  UsersModule],
  
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
