import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { UserService } from './user/user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { Repository } from 'typeorm'

describe('AppController', () => {
  let appController: AppController
  let userService: UserService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
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

      jest.spyOn(userService, 'createUser').mockResolvedValue({} as User)
      const response = await appController.register(requestBody)
      expect(userService.createUser).toBeCalledTimes(1)
      expect(response).toHaveProperty('user', expect.any(Object))
    })
  })
})
