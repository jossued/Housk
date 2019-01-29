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
     response.render('home.ejs',{publicaciones:publicaciones,nombre:session})
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
            session.usuario  = await this._usuarioService.buscarPorId(session.usuario);
            console.log(session);
            response.redirect('/')

        } else {
            throw new BadRequestException({mensaje: 'Error login'})
        }

    }

    @Get('login')
    loginVista(
        @Res() response
    ) {
        response.render('login',{nombre:''});
    }

    @Get('crear_usuario')
    registroVista(
        @Res() response
    ) {
        response.render('registrarUsuario',{nombre:''});
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() session,
    ){
        session.usuario=undefined;
        session.destroy();
        response.redirect('/');
    }

}
