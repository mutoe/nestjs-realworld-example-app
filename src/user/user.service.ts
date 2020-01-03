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
}
