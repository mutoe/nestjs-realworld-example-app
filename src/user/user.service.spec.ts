import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'

describe('UserService', () => {
  let service: UserService
  let repository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(UserService)
    repository = module.get(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('should create user correctly', async function () {
    const user = { email: 'mutoe@foxmail.com', username: 'mutoe', password: '12345678' }
    await service.createUser(user)

    expect(repository.save).toBeCalledWith(Object.assign(new UserEntity(), user))
  })

  it('should find user correctly', async function () {
    const user = { email: 'mutoe@foxmail.com', username: 'mutoe', password: '12345678' }
    jest.spyOn(repository, 'findOne').mockResolvedValue(user as UserEntity)
    const userResult = await service.findOne(user.username)

    expect(userResult).toBe(user)
    expect(repository.findOne).toBeCalledWith({ where: { username: user.username } })
  })
})
