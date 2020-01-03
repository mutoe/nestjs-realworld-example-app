import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get(AppService)
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

      jest.spyOn(appService, 'createUser').mockResolvedValue({ user: {} })
      const response = await appController.register(requestBody)
      expect(appService.createUser).toBeCalledTimes(1)
      expect(response).toHaveProperty('user', expect.any(Object))
    })
  })
})
