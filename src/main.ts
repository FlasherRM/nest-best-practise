import { NestFactory } from '@nestjs/core';
import { appOptions, globalPrefix, PORT, ProjectOptions } from './config';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, appOptions);
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle(ProjectOptions.title)
    .setDescription(ProjectOptions.description)
    .setVersion(ProjectOptions.version)
    .setBasePath(ProjectOptions.basePath)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT);
}
bootstrap().then(() => console.log('Everything is okay'));
