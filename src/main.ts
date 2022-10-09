import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config()
  const config = new DocumentBuilder()
    .setTitle('Gateway manager')
    .setDescription('Gateway manager API')
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  var appPort = process.env.PORT || '3000'
  await app.listen(Number(appPort));
}
bootstrap();
