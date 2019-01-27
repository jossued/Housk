import {Entity, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {Column ,PrimaryGeneratedColumn} from "typeorm";
import {PublicacionEntity} from "../publicacion/publicacion.entitty";
import {ComprasEntity} from "../compras/compras.entity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({
        name:'nombre',
        type:'varchar',
        length:'30',
    })
    nombreUsuario:string;
    @Column({
        name:'apellido',
        type:'varchar',
        length:'30',
    })
    apellidoUsuario:string;
    @Column({
        name:'correo',
        type:'varchar',
        length:'30',
    })
    correoUsuario:string;
    @Column({
        name:'contraseña',
        type:'varchar',
        length:'30',
    })
    clave:string;
    @OneToMany(
        publicaciones => PublicacionEntity,
        // @ts-ignore
        publicacion => publicacion.usuario,
    )
    publicaciones:PublicacionEntity[];


    @ManyToMany(type => PublicacionEntity)
    @JoinTable()
    intereses:PublicacionEntity[];

    @OneToMany(
        compras => UsuarioEntity,
        // @ts-ignore
        compra =>compra.comprador
    )
    compras:ComprasEntity[]
}