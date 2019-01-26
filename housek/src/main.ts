import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.static('publico'));
    app.set('view engine', 'ejs');
    await app.listen(3000);
}

bootstrap();
