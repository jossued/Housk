import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';
import * as session from 'express-session';
import {UsuarioEntity} from "./usuario/usuario.entity";
const FileStore = require('session-file-store')(session);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.static('publico'));
    app.set('view engine', 'ejs');
    app.use(
        session({
            name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore(),
            usuario:new UsuarioEntity(),
        })
    );
    await app.listen(3000);
}

bootstrap();
