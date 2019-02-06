// usuario-crate.dto.ts

import {IsEmpty, IsNotEmpty, IsString, Length} from "class-validator";

export class UsuarioCreateDto {

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsString()
    apellido:string;


    @IsNotEmpty()
    correo:string;

    @IsNotEmpty()
    password:string;

}