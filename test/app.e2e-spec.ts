import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserModule } from '../src/user/user.module'
import { AppController } from '../src/app.controller'

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'realworld',
  password: '123456',
  database: 'nestjs_test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  dropSchema: true,
  synchronize: true,
}

describe('AppController (e2e)', () => {
  let app

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormConfig),
        UserModule,
      ],
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello?name=world')
      .expect(200)
      .expect('Hello world!')
  })

  it('/auth/register (POST)', async () => {
    const requestBody = {
      username: 'mutoe',
      email: 'mutoe@foxmail.com',
      password: '12345678',
    }
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(requestBody)
      .expect(201)
  })
})
