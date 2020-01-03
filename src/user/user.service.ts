import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser (user: { email: string; username: string; password: string }): any {
    throw new Error('Method not implemented.')
  }
}