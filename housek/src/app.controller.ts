import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {PublicacionService} from "./publicacion/publicacion.service";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Controller()
export class AppController {
  constructor(
      private readonly _usuarioService:UsuarioService,
      private readonly _publicacionService:PublicacionService
  ) {}

  @Get()
  async getHello(
      @Res() response,
      @Session()session
  ){
     const publicaciones = await this._publicacionService.buscar();

     console.log(session.usuario);
     if(session.usuario){
         const Usuario = await this._usuarioService.buscarPorId(session.usuario);
         console.log(Usuario);
         response.render('home.ejs',{publicaciones:publicaciones,nombre:Usuario.nombreUsuario})
     }else {
         response.render('home.ejs',{publicaciones:publicaciones,nombre:''})
     }

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
