import { Body, Controller, Post } from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuarioService } from './usuario.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('usuario')

export class UsuarioController {

    
    constructor(
        private readonly _usuarioService: UsuarioService,
    ){}


    //@Post('login')
    @MessagePattern({cmd:'login-user'})
    public login(@Payload() login: LoginUsuarioDto){
        return this._usuarioService.loginUsuario(login);
    }
}
