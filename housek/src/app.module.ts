import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {PublicacionEntity} from "./publicacion/publicacion.entitty";
import {PublicacionModule} from "./publicacion/publicacion.module";
import {InmuebleModule} from "./inmueble/inmueble.module";
import {InmuebleEntity} from "./inmueble/inmueble.entity";
import {LugarGeograficoEntity} from "./lugar_geografico/lugar_geografico.entity";
import {LugarGeograficoModule} from "./lugar_geografico/lugar_geografico.module";
import {ImagenModule} from "./imagen/imagen.module";
import {ImagenEntity} from "./imagen/imagen.entity";
import {ComprasEntity} from "./compras/compras.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type:'sqlite',
              database:'housek_db',
              synchronize:true,
              dropSchema:true,
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
      InmuebleModule,
      LugarGeograficoModule,
      ImagenEntity,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
