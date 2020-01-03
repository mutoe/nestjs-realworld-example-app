import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

describe('UserService', () => {
  let service: UserService
  let repository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get(UserService)
    repository = module.get(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })
})
