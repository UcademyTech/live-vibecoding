import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { USER_ID_HEADER } from '@live/shared';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3333;
const API_PREFIX = 'api';
const DOCS_PATH = `${API_PREFIX}/docs`;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dudas en plataforma')
    .setDescription(
      `API de la sesión de live vibecoding. Todas las peticiones llevan la cabecera ${USER_ID_HEADER} con el id de uno de los usuarios del seed.`,
    )
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: USER_ID_HEADER, in: 'header' }, USER_ID_HEADER)
    .addSecurityRequirements(USER_ID_HEADER)
    .build();
  SwaggerModule.setup(DOCS_PATH, app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = Number(process.env.PORT ?? DEFAULT_PORT);
  await app.listen(port);
  new Logger('Bootstrap').log(`API en http://localhost:${port}/${API_PREFIX} · Swagger en http://localhost:${port}/${DOCS_PATH}`);
}

void bootstrap();
