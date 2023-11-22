import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Demo NestJS APIs')
    .setDescription('APIs for project: Demo NestJS')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api/', 'Local')
    .addServer('http://staging.yourapi.com/api/', 'Staging')
    .addServer('http://production.yourapi.com/api/', 'Production')
    .addTag('demo_nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('nestjs_api', app, document);

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
