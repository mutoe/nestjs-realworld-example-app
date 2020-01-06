import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'realworld',
      password: '123456',
      database: 'nestjs',
      entities: ['dist/**/*.entity.js', 'src/**/*.ts'],
      synchronize: true,
    }),
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
