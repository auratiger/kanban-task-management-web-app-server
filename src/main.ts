import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import {
   CorsConfig,
   NestConfig,
   SwaggerConfig,
} from './common/config/config.interface';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const logger = new Logger('Main');

   // Validation
   app.useGlobalPipes(new ValidationPipe());

   // enable shutdown hook
   const prismaService: PrismaService = app.get(PrismaService);
   await prismaService.enableShutdownHooks(app);

   // Prisma Client Exception Filter for unhandled exceptions
   const { httpAdapter } = app.get(HttpAdapterHost);
   app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

   const configService = app.get(ConfigService);
   const nestConfig = configService.get<NestConfig>('nest');
   const corsConfig = configService.get<CorsConfig>('cors');
   const swaggerConfig = configService.get<SwaggerConfig>('swagger');

   // Cors
   if (corsConfig.enabled) {
      app.enableCors();
   }

   // Swagger Api
   if (swaggerConfig.enabled) {
      const options = new DocumentBuilder()
         .setTitle(swaggerConfig.title || 'Nestjs')
         .setDescription(
            swaggerConfig.description || 'The nestjs API description',
         )
         .setVersion(swaggerConfig.version || '0.1.0')
         .build();
      const document = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
   }

   await app.listen(nestConfig.port);
   logger.log(`listening to port ${nestConfig.port}`);
}
bootstrap();
