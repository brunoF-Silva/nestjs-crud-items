import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- VOCÊ IMPORTOU?

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('CRUD items API')
  .setDescription('API for my CRUD items application')
  .setVersion('1.0')
  // .addTag('cats')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ensures DTOs are converted to plain objects
      whitelist: true, // removes any extra fields not in DTO
      forbidNonWhitelisted: true, // blocks unexpected fields
    }),
  );

  app.enableCors()

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
