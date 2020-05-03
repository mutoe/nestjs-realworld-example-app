import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserEntity } from 'user/user.entity'

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'realworld',
  password: '123456',
  database: 'nestjs_test',
  entities: [UserEntity],
  dropSchema: true,
  synchronize: true,
}

export default ormConfig
