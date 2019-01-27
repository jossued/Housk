import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {PublicacionService} from "./publicacion/publicacion.service";

@Controller()
export class AppController {
  constructor(
      private readonly _usuarioService:UsuarioService,
      private readonly _publicacionService:PublicacionService
  ) {}

  @Get()
  async getHello(
      @Res() response
  ){
     const publicaciones = await this._publicacionService.buscar();
     response.render('home.ejs',{publicaciones:publicaciones})
  }

    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() response,
        @Session() session
    ) {
        const identificado = await this._usuarioService
            .login(email, password);

        if (identificado) {

            session.usuario = identificado;
            response.redirect('/')

        } else {
            throw new BadRequestException({mensaje: 'Error login'})
        }

    }

    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('login');
    }
    @Get('logout')
    logout(
        @Res() response,
        @Session() session,
    ){
        session.usuario = undefined;
        session.destroy();
        response.redirect('/login');
    }

}
