import {Entity} from "typeorm";
import {Column ,PrimaryGeneratedColumn} from "typeorm";
import {ManyToOne,OneToMany} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('publicacion')
export class PublicacionEntity {
    @PrimaryGeneratedColumn()
    idPub:number;
    @Column()
    tipoPub:string;
    @Column()
    tituloPub:string;
    @Column()
    costoPub:number;
    @Column()
    estadoPub:boolean;
    @Column({
            type:'date'
        }
    )
    // @ts-ignore
    fechaPub:string;

    @ManyToOne(
        type => UsuarioEntity,
        // @ts-ignore
        usuario =>usuario.publicaciones,
    )
    usuario:UsuarioEntity;



}