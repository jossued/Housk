import {Module} from "@nestjs/common";
import {InmuebleEntity} from "./inmueble.entity";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
    {
        imports: [TypeOrmModule.forFeature([InmuebleEntity])],
        controllers:[],
        providers:[],
        exports:[],
    })
export class InmuebleModule {}
