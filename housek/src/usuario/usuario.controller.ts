import {BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {In, Like} from "typeorm";
import {PublicacionService} from "../publicacion/publicacion.service";

@Controller('Usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService:UsuarioService,
    ){

    }

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
    ) {
        let mensaje; // undefined
        let clase; // undefined

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    clase = 'info';
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    clase = 'danger';
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    clase = 'success';
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }

        let usuarios: UsuarioEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        biografia: Like(`%${busqueda}%`)
                    }
                ]
            };
            usuarios = await this._usuarioService.buscar(consulta);
        } else {
            usuarios = await this._usuarioService.buscar();
        }

        response.render('inicio', {
            nombre: 'Los amos del universo',
            arreglo: usuarios,
            mensaje: mensaje,
            accion: clase
        });
    }

    @Get('intereses')
    async interes(
        @Res() response,
        @Session() session
    ){
        const id =  session.usuario;
        console.log(id);

        const usuario = await this._usuarioService.buscarPorId(id);
        response.render(
            'intereses.ejs',{
                intereses_usuario:usuario
            }
        )
    }


}
