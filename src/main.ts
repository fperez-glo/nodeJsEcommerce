import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { fastifyHelmet } from 'fastify-helmet';
import compression from 'fastify-compress';

console.log('qa', process.env.ENVIORMENT)
const QA = process.env.ENVIORMENT
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: QA ? true : false}),
  );
  
  await app.register(fastifyHelmet);
  app.register(compression); 


  await app.listen(5000, '0.0.0.0');
}
bootstrap();
