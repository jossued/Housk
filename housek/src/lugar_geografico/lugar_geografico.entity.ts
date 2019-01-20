import {Entity} from "typeorm";
import {Column ,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import {InmuebleEntity} from "../inmueble/inmueble.entity";

@Entity('lugar_geografico')
export class LugarGeograficoEntity {
    @PrimaryGeneratedColumn()
    idLugar:number;
    @Column()
    nombreLugar:string;

    @OneToMany(
        lugares_geograficos => LugarGeograficoEntity,
        lugar_geografico => lugar_geografico,
    )
    lugar_geografico_hijos:LugarGeograficoEntity[];
    @ManyToOne(
        type => LugarGeograficoEntity,
        lugar_geogragico => lugar_geogragico.lugar_geografico_hijos
    )
    lugar_geografico_padre:LugarGeograficoEntity

    @OneToMany(
        inmuebles => InmuebleEntity,
        inmueble => inmueble.lugar_geografico,
    )
    inmuebles:InmuebleEntity[]

}