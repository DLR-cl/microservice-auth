import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
    imports: [DatabaseModule],
    providers: [UsuarioService],
    controllers: [UsuarioController]
})
export class UsuarioModule {}
