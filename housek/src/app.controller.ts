import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {Usuario, UsuarioService} from "./usuario/usuario.service";
import {PublicacionService} from "./publicacion/publicacion.service";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {validate, ValidationError} from "class-validator";
import {UsuarioCreateDto} from "./usuario/dto/usuario-create.dto";


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
        console.log(email,password)

        if (identificado) {
            session.usuario  = await this._usuarioService.buscarPorId(identificado);
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
        response.render('registrar_usuario',{nombre:''});
    }
    @Post('crear_usuario')
    async crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response,
    ) {
        /*const usuarioValidado = new UsuarioCreateDto();

        usuarioValidado.nombre = usuario.nombreUsuario;
        usuarioValidado.apellido = usuario.apellidoUsuario;
        usuarioValidado.correo = usuario.correoUsuario;
        usuarioValidado.password = usuario.clave;

        const errores: ValidationError[] = await validate(usuarioValidado);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);
            response.redirect('/crear-usuario?error=Hay errores');

        } else {
        */
            await this._usuarioService.crear(usuario);
            response.redirect('/');
        // }


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
