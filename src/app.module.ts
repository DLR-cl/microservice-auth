import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
})
export class AppModule {}
