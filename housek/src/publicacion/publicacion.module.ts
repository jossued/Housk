import {Module} from "@nestjs/common";
import {PublicacionEntity} from "./publicacion.entitty";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forFeature([PublicacionEntity])
    ],
    controllers:[],
    providers:[],
    exports:[],
})
export class PublicacionModule {}