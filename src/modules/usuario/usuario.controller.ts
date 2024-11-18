import { Body, Controller, Post } from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')

export class UsuarioController {

    
    constructor(
        private readonly _usuarioService: UsuarioService,
    ){}


    @Post('login')
    public login(@Body() login: LoginUsuarioDto){
        return this._usuarioService.loginUsuario(login);
    }
}
