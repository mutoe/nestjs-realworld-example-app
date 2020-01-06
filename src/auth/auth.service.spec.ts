import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile()

    authService = module.get(AuthService)
    userService = module.get(UserService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('should get user profile after validateUser', async function () {
    const password = '12345678'
    const username = 'mutoe'
    jest.spyOn(userService, 'findOne').mockResolvedValue({ username, password } as User)
    const user = await authService.validateUser(username, password)

    expect(user).toHaveProperty('username', username)
    expect(user).not.toHaveProperty('password')
  })

  it('should return null when invalid password', async function () {
    jest.spyOn(userService, 'findOne').mockResolvedValue(undefined)
    const result = await authService.validateUser('mutoe', 'invalidPassword')

    expect(result).toBeNull()
  })
})
