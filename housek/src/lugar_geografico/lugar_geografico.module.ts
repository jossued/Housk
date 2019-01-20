import {Module} from "@nestjs/common";
import {LugarGeograficoEntity} from "./lugar_geografico.entity";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
    {
        imports: [TypeOrmModule.forFeature([LugarGeograficoEntity])],
        controllers:[],
        providers:[],
        exports:[],
    })
export class LugarGeograficoModule {}