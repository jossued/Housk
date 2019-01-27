import {Entity, JoinColumn, JoinTable, ManyToMany, OneToOne} from "typeorm";
import {Column ,PrimaryGeneratedColumn} from "typeorm";
import {ManyToOne,OneToMany} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PublicacionEntity} from "../publicacion/publicacion.entitty";

@Entity('compras')
export class ComprasEntity {
    @PrimaryGeneratedColumn()
    idCompra:number;
    @OneToOne(type => PublicacionEntity)
    @JoinColumn()
    publicacion:PublicacionEntity;
    @ManyToOne(type => UsuarioEntity,usuario =>usuario.compras)
    comprador:UsuarioEntity;
    @Column({
        type:'date'
    })
    fechaCompra:string
}