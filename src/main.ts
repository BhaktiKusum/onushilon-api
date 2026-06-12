import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import compression from 'compression';

import { AppModule } from './app.module';
import cors from'cors';

import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  // app.enableCors();

  app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001'],
  credentials: true // Include this if you are using cookies/sessions
}));

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Learning Platform API')
    .setDescription('NestJS + Prisma API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
    // Swagger Configuration
  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Onushilon API')
  //   .setDescription('Backend API for Onushilon')
  //   .setVersion('1.0.0')
  //   .addBearerAuth()
  //   .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
  );

  const port = process.env.PORT || 5000;

  await app.listen(port);


  console.log(
    `🚀 Application running on: http://localhost:${port}`,
  );

  console.log(
    `📚 Swagger Docs: http://localhost:${port}/api/docs`,
  );

}

bootstrap();