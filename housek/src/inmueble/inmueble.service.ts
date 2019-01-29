import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {InmuebleEntity} from "./inmueble.entity";
import {PublicacionEntity} from "../publicacion/publicacion.entitty";
import {LugarGeograficoEntity} from "../lugar_geografico/lugar_geografico.entity";
import {ImagenEntity} from "../imagen/imagen.entity";

@Injectable()
export class InmuebleService {
    // Inyectar dependencias
    constructor(
        @InjectRepository(InmuebleEntity)
        private readonly _InmuebleRepository:Repository<InmuebleEntity>
    ){

    }

    // Buscar publicaciones por parametros
    buscar(parametros?:FindManyOptions<InmuebleEntity>):Promise<InmuebleEntity[]>{
        return this._InmuebleRepository.find(parametros)
    }

    async crear(nuevaPublicacion:Inmueble):Promise<InmuebleEntity>{
        // Instanciamos la entidad
        const InmuebleEntity = this._InmuebleRepository.create(nuevaPublicacion);
        // Guardar la entidad en la BD
        return await this._InmuebleRepository.save(InmuebleEntity);
    }
}




export interface Inmueble{
    idInmeble?:number,
    sectorEdif:string,
    callePrincipalEdif:string,
    calleSecundariaEdif:string,
    idMunicipalEdif:string,
    areaTerrenoEdif:number,
    areaTerrenoConstEdif:number,
    numPisosEdif:number,
    numDormitorioEdif:number,
    numBatSaniEdif:number,
    numParqueaderoEdif:number,
    antiguead:number,
    publicacion:PublicacionEntity,
    lugar_geografico:LugarGeograficoEntity,
}