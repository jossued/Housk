import {Entity, JoinColumn, OneToOne} from "typeorm";
import {Column,PrimaryGeneratedColumn,ManyToOne,OneToMany} from "typeorm";
import {PublicacionEntity} from "../publicacion/publicacion.entitty";
import {LugarGeograficoEntity} from "../lugar_geografico/lugar_geografico.entity";
import {ImagenEntity} from "../imagen/imagen.entity";

@Entity('inmueble')
export class InmuebleEntity {
    @PrimaryGeneratedColumn()
    idInmeble:number;
    @OneToOne(type => PublicacionEntity)
    @JoinColumn()
    publicacion:PublicacionEntity;
    @Column()
    sectorEdif:string;
    @Column()
    callePrincipalEdif:string;
    @Column()
    calleSecundariaEdif:string;
    @Column()
    idMunicipalEdif:string;
    @Column()
    areaTerrenoEdif:number;
    @Column()
    areaTerrenoConstEdif:number;
    @Column()
    numPisosEdif:number;
    @Column()
    numDormitorioEdif:number;
    @Column()
    numBatSaniEdif:number;
    @Column()
    numParqueaderoEdif:number;
    @Column()
    antiguead:number;


    @ManyToOne(
        type => LugarGeograficoEntity,
        // @ts-ignore
        lugar_geogragico => lugar_geogragico.inmuebles
    )
    lugar_geografico:LugarGeograficoEntity
    // @ts-ignore
    @OneToMany(
        type => ImagenEntity,
        // @ts-ignore
        imagen=>imagen.inmueble,
    )
    imagen:ImagenEntity[]
}