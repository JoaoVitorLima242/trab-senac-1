import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only pass items with class-validation ex: @isString()
      forbidNonWhitelisted: true, // Only items with class-validation, if item is not from whitelist return a error
      transform: true, // transform items in theirs types
    }),
  );
  await app.listen(3001);
}
bootstrap();
