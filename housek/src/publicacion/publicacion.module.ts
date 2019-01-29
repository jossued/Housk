import {Module} from "@nestjs/common";
import {PublicacionEntity} from "./publicacion.entitty";
import {TypeOrmModule} from '@nestjs/typeorm';
import {PublicacionService} from "./publicacion.service";
import {PublicacionController} from "./publicacion.controller";
import {ComprasService} from "../compras/compras.service";
import {ComprasEntity} from "../compras/compras.entity";
import {LugarGeograficoService} from "../lugar_geografico/lugar_geografico.service";
import {LugarGeograficoEntity} from "../lugar_geografico/lugar_geografico.entity";
import {Lugar_geograficoController} from "../lugar_geografico/lugar_geografico.controller";
import {ImagenEntity} from "../imagen/imagen.entity";
import {InmuebleEntity} from "../inmueble/inmueble.entity";
import {ImagenService} from "../imagen/imagen.service";
import {InmuebleService} from "../inmueble/inmueble.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([ComprasEntity]),
        TypeOrmModule.forFeature([PublicacionEntity]),
        TypeOrmModule.forFeature([LugarGeograficoEntity]),
        TypeOrmModule.forFeature([ImagenEntity]),
        TypeOrmModule.forFeature([InmuebleEntity]),
    ],
    controllers:[PublicacionController,Lugar_geograficoController],
    providers:[PublicacionService,ComprasService,LugarGeograficoService,ImagenService,InmuebleService],
    exports:[PublicacionService,ComprasService,LugarGeograficoService,ImagenService,InmuebleService],
})
export class PublicacionModule {}