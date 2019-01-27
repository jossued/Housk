import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {ComprasEntity} from "./compras.entity";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {PublicacionEntity} from "../publicacion/publicacion.entitty";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {options} from "tsconfig-paths/lib/options";


@Injectable()
export class ComprasService {
    constructor(
        @InjectRepository(ComprasEntity)
        private readonly _comprasRepository:Repository<ComprasEntity>
    ){

    }

    // Buscar publicaciones por parametros
    buscar(parametros?:FindManyOptions<ComprasEntity>):Promise<ComprasEntity[]>{
        return this._comprasRepository.find(parametros)
    }

    async crear(nuevaCompra:Compra):Promise<ComprasEntity>{
        // Instanciamos la entidad
        const compraEntity = this._comprasRepository.create(nuevaCompra);
        // Guardar la entidad en la BD
        return await this._comprasRepository.save(compraEntity);
    }

}

export interface Compra {
    idCompra:number,
    publicacion:PublicacionEntity,
    comprador:UsuarioEntity,
    fechaCompra:string,
}