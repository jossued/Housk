import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {PublicacionService} from "./publicacion.service";
import {ComprasService} from "../compras/compras.service";

@Controller('Publicacion')
export class PublicacionController {
    constructor(
        private readonly _publicacionService: PublicacionService,
        private readonly _compraService:ComprasService,
    ){

    }

    @Get('saludo')
    saludo():String{
        return 'Hola estas en la publicacion'
    }

    // Ver las publicaciones del usuario
    @Get('ver')
    async ver(
        @Res() response,
        @Session() session,
    ){
        const consulta = {
            where:[
                {
                    usuario: session.usuario
                }
            ]
        };
        const publicaciones = await this._publicacionService.buscar(consulta);
        response.render(
            'publicaciones.ejs',{
                publicaciones_usuario:publicaciones
            }
        )
    }

    // Ver las compras realizadas por el usuario
    @Get('compras')
    async compras(
        @Res() response,
        @Session() session,
    ){
        const consulta = {relations: ["publicacion"],
            where:[
                {
                    comprador: session.usuario
                }
            ]
        };
        // Buscamos las compras que ha hecho el usuario
        const compras = await this._compraService.buscar(consulta);
        console.log(compras);
        response.render(
            'compras.ejs',{
                compras_usuario:compras
            }
        )
    }


}