import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // js, css
  app.useStaticAssets(join(__dirname, '..', 'public'))
  // template engine 위치
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  // template engine 지정
  app.setViewEngine('hbs')

  await app.listen(8000);
}
bootstrap();
