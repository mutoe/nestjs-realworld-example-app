import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'app.controller'
import * as request from 'supertest'
import { UserModule } from 'user/user.module'
import ormConfig from '../test/orm-config'

describe('AppController (e2e)', () => {
  let app

  beforeAll(async () => {
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

  afterAll(async () => {
    await app.close()
  })

  it('/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello?name=world')
      .expect(200)
      .expect('Hello world!')
  })
})
