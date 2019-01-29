import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {PublicacionEntity} from "./publicacion/publicacion.entitty";
import {PublicacionModule} from "./publicacion/publicacion.module";
import {InmuebleEntity} from "./inmueble/inmueble.entity";
import {LugarGeograficoEntity} from "./lugar_geografico/lugar_geografico.entity";
import {ImagenEntity} from "./imagen/imagen.entity";
import {ComprasEntity} from "./compras/compras.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type:'sqlite',
              database:'housek_db',
              synchronize:true,
              dropSchema:false,
                entities:[
                    UsuarioEntity,
                    PublicacionEntity,
                    InmuebleEntity,
                    LugarGeograficoEntity,
                    ImagenEntity,
                    ComprasEntity
                ],
          }),
      UsuarioModule,
      PublicacionModule,
      ImagenEntity,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
