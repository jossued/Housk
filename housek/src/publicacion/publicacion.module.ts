import {Module} from "@nestjs/common";
import {PublicacionEntity} from "./publicacion.entitty";
import {TypeOrmModule} from '@nestjs/typeorm';
import {PublicacionService} from "./publicacion.service";
import {PublicacionController} from "./publicacion.controller";
import {ComprasService} from "../compras/compras.service";
import {ComprasEntity} from "../compras/compras.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([ComprasEntity]),
        TypeOrmModule.forFeature([PublicacionEntity])
    ],
    controllers:[PublicacionController],
    providers:[PublicacionService,ComprasService],
    exports:[PublicacionService,ComprasService],
})
export class PublicacionModule {}