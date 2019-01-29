// @ts-ignore
import {
    Body,
    Controller,
    FilesInterceptor,
    Get,
    Param,
    Post,
    Query,
    Res,
    Session, UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {Publicacion, PublicacionService} from "./publicacion.service";
import {ComprasService} from "../compras/compras.service";
import {extname} from "path";
import {storage} from "./helper";
import {Inmueble, InmuebleService} from "../inmueble/inmueble.service";
import {PublicacionEntity} from "./publicacion.entitty";
import {ImagenEntity} from "../imagen/imagen.entity";
import {LugarGeograficoService} from "../lugar_geografico/lugar_geografico.service";
import {Imagen, ImagenService} from "../imagen/imagen.service";

@Controller('Publicacion')
export class PublicacionController {
    constructor(
        private readonly _publicacionService: PublicacionService,
        private readonly _compraService:ComprasService,
        private readonly _lugar_geoSerice:LugarGeograficoService,
        private readonly _imagenService:ImagenService,
        private readonly _inmuebleService:InmuebleService,
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
        console.log(session);
        const consulta = {relations: ["usuario"],
            where:[
                {
                    usuario: session.usuario
                }
            ]
        };
        const publicaciones = await this._publicacionService.buscar(consulta);
        // Obtener el nombre del usuario
        console.log(publicaciones);
        response.render('publicaciones.ejs',{publicaciones_usuario:publicaciones,nombre:session})
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
                    compras_usuario:compras,
                    nombre:session
                }
            )

    }

    // Registar publicacion
    @Post('registrar')
    @UseInterceptors(
        FilesInterceptor('files',6,{
            //dest: 'publico/imagenes',
            storage:storage
        }
        )

    )
    async uploadFile(
        @UploadedFiles() files,
        @Body('titulo')titulo:string,
        @Body('costo')costo:number,
        @Body('sector')sector:string,
        @Body('calleP')calleP:string,
        @Body('calleS')calleS:string,
        @Body('idM')idM:string,
        @Body('areaE')areaE:number,
        @Body('areaC')areaC:number,
        @Body('npisos')npisos:number,
        @Body('ndor')ndor:number,
        @Body('nbat')nbat:number,
        @Body('nPar')nPar:number,
        @Body('ant')ant:number,
        @Body('ciudades')ciudad:Number,
        @Session() session,
        @Res() response,

    ) {

        // registro la publicacion y obtengo su id

        const publicacion:Publicacion = {
            tipoPub:"",
            tituloPub:titulo,
            costoPub:costo,
            estadoPub:true,
            fechaPub:Date(),
            usuario:session.usuario
        };
        const publicacion_nueva = await this._publicacionService.crear(publicacion);
        // registro un inmueble con el id de la publicacion
        const inmueble:Inmueble = {
            sectorEdif:sector,
            callePrincipalEdif:calleP,
            calleSecundariaEdif:calleS,
            idMunicipalEdif:idM,
            areaTerrenoEdif:areaE,
            areaTerrenoConstEdif:areaC,
            numPisosEdif:npisos,
            numDormitorioEdif:ndor,
            numBatSaniEdif:nbat,
            numParqueaderoEdif:nPar,
            antiguead:ant,
            publicacion:publicacion_nueva,
            lugar_geografico:await this._lugar_geoSerice.buscarPorId(+ciudad),
        };
        const inmueble_nuevo = await this._inmuebleService.crear(inmueble);
        files.forEach(
                async (file)=>{
                    // para cada arreglo de imagenes 'files' extraigo su ruta
                    const imagen:Imagen={ rutaImg:file.path,inmueble:inmueble_nuevo };
                    // registro una imagen con la ruta y el id del  inmueble'
                    const imagen_nueva = await this._imagenService.crear(imagen);
                }
            );
        // redireciono la pagina de publicacioenes del usuario

        return response.redirect('/Publicacion/ver')
    }

    @Get('registrar')
    registrar(
        @Res() response,
        @Session() session,
    ){
        return response.render('crear_publicacion.ejs',{nombre:session})
    }


}