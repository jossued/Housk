import {Inject, Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';


@Injectable()
export class UsuarioService {
    // Inyectar Dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros);
    }

    buscarPorId(idUsuario: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(idUsuario, {relations: ["intereses"]} );
    }

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository
            .create(nuevoUsuario);

        // Guardar una entidad en la BDD -> .save()
        const usuarioCreado = await this._usuarioRepository
            .save(usuarioEntity);

        return usuarioCreado;
    }


    async login(correo: string, password: string)
        : Promise<number> {
        // 1) Buscar al usuario por username
        // 2) Comparar si el password es igual al password

        const usuarioEncontrado = await this._usuarioRepository
            .findOne({
                where: {
                    correo: correo
                }
            });
        if(usuarioEncontrado){
            if(usuarioEncontrado.clave === password){
                return usuarioEncontrado.id
            }else {
                return 0
            }
        }else {
            return 0
        }
    }

    actualizar(idUsuario: number,
               nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        nuevoUsuario.id = idUsuario;

        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);

        return this._usuarioRepository.save(usuarioEntity);
    }


}

export interface Usuario {
    id: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoUsuario?: string;
    clave?: string;
}

export interface Publicaciones {
    idPub: number;
    tipoPub: string;
    tituloPub: string;
    costoPub?: number;
    estadoPub?: boolean;
    fechaPub?: string;
}