import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AuthService } from 'auth/auth.service'
import { RegisterDto } from 'auth/dto/register.dto'
import { UserEntity } from 'user/user.entity'
import { UserService } from 'user/user.service'
import { AuthController } from './auth.controller'

describe('Auth Controller', () => {
  let controller: AuthController
  let authService: AuthService

  const mockUserProfile = {
    id: 1,
    email: 'foo@bar.com',
    createdAt: '',
    updatedAt: '',
    username: 'foo',
    bio: null,
    image: null,
    token: 'token',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get(AuthController)
    authService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('register', () => {
    it('should call register service when call register controller', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(mockUserProfile)

      const registerDto: RegisterDto = { email: 'foo@bar.com', username: 'foo', password: 'bar' }
      const res = await controller.register(registerDto)

      expect(res).toHaveProperty('user')
      expect(res.user).not.toHaveProperty('password')
      expect(res.user).toEqual(mockUserProfile)
    })
  })

  describe('login', () => {
    it('should call login service when call login controller', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(mockUserProfile)

      const res = await controller.login({ email: 'foo@bar.com', password: '123456' })

      expect(res).toHaveProperty('user')
      expect(res.user).not.toHaveProperty('password')
      expect(res.user).toEqual(mockUserProfile)
    })
  })
})
