import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsuarioService {

    private readonly logger = new Logger('AuthService');
    constructor(
        private readonly _databaseService: DatabaseService,
    ){
        this.logger.log('Conectado a la base de datos');
    }
    

    public async loginUsuario(loginUsuario: LoginUsuarioDto){
        try {
            if(!await this.existUsuario(loginUsuario.correo)){
                throw new RpcException({
                    status: HttpStatus.BAD_REQUEST,
                    message: 'contraseña o correo inválidos'
                });
            };

            const auth = await this._databaseService.usuario.findFirst({
                where:{
                    correo: loginUsuario.correo,
                    password: loginUsuario.password,
                }
            });

            if(!auth){
                throw new RpcException({
                    status: HttpStatus.UNAUTHORIZED,
                    message: 'Contraseña o correo inválidos'
                });
            }

            return true;
        }catch(error){
            if(error instanceof RpcException){
                throw error;
            }else {
                throw new RpcException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error interno del servidor al logear usuario'
                });
            }
        }
    }

    public async existUsuario(correo: string){
        const existeUsuario = await this._databaseService.usuario.findFirst({
            where: {
                correo: correo,
            }
        });


        if(!existeUsuario){
            return false;
        }
        return true;
    }
}
