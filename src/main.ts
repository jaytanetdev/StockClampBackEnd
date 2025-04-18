import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TAppConfig } from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongooseExceptionFilter } from './common/mongoose-exception.filter';
import * as cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bodyParser: true,
    cors: {
      origin: process.env.FRONTEND_HOSTNAME || 'http://localhost:3000',
      credentials: true,
    },
    rawBody: true,
    bufferLogs: true,
  });

  const configSvc = app.get(ConfigService);
  const appConfig = configSvc.get<TAppConfig>('app');

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(cookieParser('JJSECRET'));
  const config = new DocumentBuilder()
    .setTitle('STOCK CLAMP')
    .setDescription('-')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory, {
    url: 'doc',
    jsonDocumentUrl: 'doc-json',
  });

  app.useGlobalFilters(new MongooseExceptionFilter());
  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
