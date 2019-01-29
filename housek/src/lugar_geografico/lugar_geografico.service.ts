import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {LugarGeograficoEntity} from "./lugar_geografico.entity";
import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";

import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class LugarGeograficoService {
    // Inyectar dependencias
    constructor(
        @InjectRepository(LugarGeograficoEntity)
        private readonly _lugarGeograficoRepository:Repository<LugarGeograficoEntity>
    ){}
    // Buscar publicaciones por parametros
    buscar(parametros?:FindManyOptions<LugarGeograficoEntity>):Promise<LugarGeograficoEntity[]>{
        return this._lugarGeograficoRepository.find(parametros)
    }

    buscarPorId(idLugar: number): Promise<LugarGeograficoEntity> {
        return this._lugarGeograficoRepository.findOne(idLugar);
    }
}