import { Module } from '@nestjs/common';

import { UsuarioController } from './modules/usuario/usuario.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
