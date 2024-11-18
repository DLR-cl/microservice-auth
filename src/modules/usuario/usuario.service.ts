import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        private readonly _databaseService: DatabaseService,
    ){}
    

    public async loginUsuario(loginUsuario: LoginUsuarioDto){
        try {
            if(!await this.existUsuario(loginUsuario.correo)){
                throw new BadRequestException('Usuario no existe');
            };

            const auth = await this._databaseService.usuario.findFirst({
                where:{
                    correo: loginUsuario.correo,
                    password: loginUsuario.password,
                }
            });

            if(!auth){
                throw new BadRequestException('Correo o Contraseña inválidas');
            }

            return true;
        }catch(error){
            if(error instanceof BadRequestException){
                throw error;
            }else {
                throw new InternalServerErrorException('error interno');
            }
        }
    }

    public async existUsuario(correo: string){
        const existeUsuario = await this._databaseService.usuario.findFirst({
            where: {
                correo: correo,
            }
        });


        if(existeUsuario!){
            return false;
        }
        return true;
    }
}
