import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'app.controller'
import { AuthModule } from 'auth/auth.module'
import { UserModule } from 'user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
})
export class AppModule {}
