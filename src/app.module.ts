import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {
  constructor (private readonly connection: Connection) {}
}
