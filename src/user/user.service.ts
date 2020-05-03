import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { omit } from 'lodash'
import { Repository } from 'typeorm'

import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser (userInfo: { email: string; username: string; password: string }) {
    const result = await this.userRepository.save(Object.assign(new UserEntity(), userInfo))
    return omit(result, ['password'])
  }

  async findUser (by: { username?: string; email?: string }, withPassword = false) {
    if (!withPassword) return this.userRepository.findOne({ where: by })

    const select = Object.keys(this.userRepository.metadata.propertiesMap) as (keyof UserEntity)[]
    return this.userRepository.findOne({ where: by, select })
  }
}
