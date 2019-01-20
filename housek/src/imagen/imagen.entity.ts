import {Entity} from "typeorm";
import {Column,PrimaryGeneratedColumn,ManyToOne} from "typeorm";
import {InmuebleEntity} from "../inmueble/inmueble.entity";

@Entity('imagen')
export class ImagenEntity {
    @PrimaryGeneratedColumn()
    idImg:number
    @Column({
        name:'RutaImagen',
        type:'varchar',
        length:'50',
    })
    rutaImg:string;
    @ManyToOne(
        type => InmuebleEntity
    )
    inmueble:InmuebleEntity

}