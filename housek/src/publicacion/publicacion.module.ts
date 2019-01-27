import {Module} from "@nestjs/common";
import {PublicacionEntity} from "./publicacion.entitty";
import {TypeOrmModule} from '@nestjs/typeorm';
import {PublicacionService} from "./publicacion.service";
import {PublicacionController} from "./publicacion.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([PublicacionEntity])
    ],
    controllers:[PublicacionController],
    providers:[PublicacionService],
    exports:[PublicacionService],
})
export class PublicacionModule {}