import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {PublicacionService} from "./publicacion.service";
import {PublicacionEntity} from "./publicacion.entitty";
import {Like} from "typeorm";

@Controller('Publicacion')
export class PublicacionController {
    constructor(
        private readonly _publicacionService: PublicacionService
    ){

    }

    @Get('saludo')
    saludo():String{
        return 'Hola estas en la publicacion'
    }

    @Get('ver')
    async ver(
        @Res() response,
        @Query('id_usuario') id_usuario:number,
    ){
        const consulta = {
            where:[
                {
                    usuario: id_usuario
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
}