import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/skincancerrecognition.key'),
    cert: fs.readFileSync('./secrets/skincancerrecognition.crt')
  };
  const app = await NestFactory.create(AppModule, {httpsOptions, cors: true});
  app.setGlobalPrefix('fs');
  await app.listen(process.env.PORT);
}

bootstrap();
