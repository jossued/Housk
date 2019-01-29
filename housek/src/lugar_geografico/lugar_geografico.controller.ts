// @ts-ignore
import {
    Controller,
    FilesInterceptor,
    Get,
    Param,
    Post,
    Query,
    Res,
} from "@nestjs/common";
import {LugarGeograficoService} from "./lugar_geografico.service";

@Controller('LugarGeo')
export class Lugar_geograficoController {
    constructor(
        private readonly _lugarService: LugarGeograficoService,
    ) {

    }
@Get('obtener')
async lugar(
    @Query('id_padre') id_padre:number,
)
{
    const consulta =  {relation:['lugar_geografico_padre'],
        where:[
            {
                lugar_geografico_padre:id_padre
            }
        ]
    };
    return await this._lugarService.buscar(consulta);
}

}