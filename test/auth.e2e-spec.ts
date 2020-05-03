import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from 'app.controller'
import { AuthModule } from 'auth/auth.module'
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
        AuthModule,
      ],
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/auth/register (POST)', () => {
    it('should return 201', async () => {
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

    it('should return 400 given exist username', async () => {
      const requestBody = {
        username: 'mutoe',
        email: 'foo@bar.com',
        password: '12345678',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)
        .expect(400)
      expect(response.body).toHaveProperty('message', 'username is exist')
    })

    it('should return 400 given exist email', async () => {
      const requestBody = {
        username: 'foobar',
        email: 'mutoe@foxmail.com',
        password: '12345678',
      }
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(requestBody)
        .expect(400)
      expect(response.body).toHaveProperty('message', 'email is exist')
    })
  })

  describe('/auth/login (POST)', () => {
    it('should return 200 when login given correct user name and password', async () => {
      const requestBody = {
        email: 'mutoe@foxmail.com',
        password: '12345678',
      }
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)
        .expect(200)
    })

    it('should return 400 when login given incorrect user name', async () => {
      const requestBody = {
        email: 'not-exist@example.com',
        password: '12345678',
      }
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)
        .expect(400)
      expect(res.body).toHaveProperty('message', 'user is not exist')
    })

    it('should return 400 when login given incorrect password', async () => {
      const requestBody = {
        email: 'mutoe@foxmail.com',
        password: 'invalid',
      }
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send(requestBody)
        .expect(400)
      expect(res.body).toHaveProperty('message', 'password is invalid')
    })
  })
})
