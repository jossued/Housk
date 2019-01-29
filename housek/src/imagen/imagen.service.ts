import {Repository} from "typeorm";
import {InmuebleEntity} from "../inmueble/inmueble.entity";
import {Injectable} from "@nestjs/common";
import {ImagenEntity} from "./imagen.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ImagenService {
    constructor(
        @InjectRepository(ImagenEntity)
        private readonly _imagenRespository:Repository<ImagenEntity>
    ){}

    async crear(imagen:Imagen):Promise<ImagenEntity>{
        const inmuebleEntity = this._imagenRespository.create(imagen);
        return await this._imagenRespository.save(inmuebleEntity);
    }
}


export interface Imagen {
    idImg?:number
    rutaImg?:string;
    inmueble:InmuebleEntity
}