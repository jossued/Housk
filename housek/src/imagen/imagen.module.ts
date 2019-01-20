import {Module} from "@nestjs/common";
import {ImagenEntity} from "./imagen.entity";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module(
    {
        imports:[TypeOrmModule.forFeature([ImagenEntity])],
        controllers:[],
        providers:[],
        exports:[],
    }
)
export class ImagenModule {}