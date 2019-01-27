import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {PublicacionService} from "./publicacion.service";
import {PublicacionEntity} from "./publicacion.entitty";
import {Like} from "typeorm";
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


    @Get('compras')
    async compras(
        @Res() response,
        @Query('id_usuario') id_usuario:string
    ){
        const consulta = {
            where:[
                {
                    comprador: id_usuario
                }
            ]
        };
        // Buscamos las compras que ha hecho el usuario
        const compras = await this._compraService.buscar(consulta);

        response.render(
            'compras.ejs',{
                compras_usuario:compras
            }
        )
    }
}