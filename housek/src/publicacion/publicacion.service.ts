import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {PublicacionEntity} from "./publicacion.entitty";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";

import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class PublicacionService {
    // Inyectar dependencias
    constructor(
        @InjectRepository(PublicacionEntity)
        private readonly _publicacionRepository:Repository<PublicacionEntity>
    ){

    }

    // Buscar publicaciones por parametros
    buscar(parametros?:FindManyOptions<PublicacionEntity>):Promise<PublicacionEntity[]>{
        return this._publicacionRepository.find(parametros)
    }

    async crear(nuevaPublicacion:Publicacion):Promise<PublicacionEntity>{
        // Instanciamos la entidad
        const publicacionEntity = this._publicacionRepository.create(nuevaPublicacion);
        // Guardar la entidad en la BD
         return await this._publicacionRepository.save(publicacionEntity);
    }

    actualizar(idPublicacion:number,nuevaPublicacion:Publicacion):Promise<PublicacionEntity>{
        nuevaPublicacion.idPub = idPublicacion;
        const publicacionEntity = this._publicacionRepository.create(nuevaPublicacion);
        return this._publicacionRepository.save(publicacionEntity);
    }

    borrar(idPublicacion: number):Promise<PublicacionEntity>{
        const publicacionEntity = this._publicacionRepository.create({idPub:idPublicacion});
        return this._publicacionRepository.remove(publicacionEntity)
    }

}

export interface Publicacion{
    idPub:number;
    tipoPub:string;
    tituloPub:string;
    costoPub:number;
    estadoPub:boolean;
    fechaPub:string;
    usuario:UsuarioEntity
    usuario_comprador?:UsuarioEntity
}