import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.BACK_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:8080',
      credentials: true,
    }
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log('running on port', port);
}
bootstrap();
