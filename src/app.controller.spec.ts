import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { UserService } from './user/user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from './user/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth/auth.service'

describe('AppController', () => {
  let appController: AppController
  let userService: UserService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile()

    appController = app.get(AppController)
    userService = app.get(UserService)
  })

  describe('Hello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBe('Hello world!')
    })
  })

  describe('Register', function () {
    it('should return user response', async function () {
      const requestBody = {
        email: 'mutoe@foxmail.com',
        username: 'mutoe',
        password: '12345678',
      }

      jest.spyOn(userService, 'createUser').mockResolvedValue({} as UserEntity)
      const response = await appController.register(requestBody)
      expect(userService.createUser).toBeCalledTimes(1)
      expect(response).toHaveProperty('user', expect.any(Object))
    })
  })
})
