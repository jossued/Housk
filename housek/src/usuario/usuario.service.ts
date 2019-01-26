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

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository
            .create(nuevoUsuario);

        // Guardar una entidad en la BDD -> .save()
        const usuarioCreado = await this._usuarioRepository
            .save(usuarioEntity);

        return usuarioCreado;
    }


    async login(username: string, password: string)
        : Promise<boolean> {
        // 1) Buscar al usuario por username
        // 2) Comparar si el password es igual al password

        const usuarioEncontrado = await this._usuarioRepository
            .findOne({
                where: {
                    username: username
                }
            });


        if (usuarioEncontrado) {

            if (usuarioEncontrado.clave === password) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
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