import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser (userInfo: { email: string; username: string; password: string }) {
    return this.userRepository.save(Object.assign(new UserEntity(), userInfo))
  }

  login

  async findOne (username: string) {
    return this.userRepository.findOne({ where: { username } })
  }
}
