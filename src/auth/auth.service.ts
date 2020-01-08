import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { cryptoPassword } from '../utils'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser (username: string, password: string) {
    const user = await this.userService.findOne(username)
    if (!user) {
      throw new BadRequestException('user is not exist')
    }
    if (user.password !== cryptoPassword(password)) {
      throw new BadRequestException('password is invalid')
    }
    const { password: _, ...profile } = user
    return profile
  }

  generateToken (userId: number, username: string) {
    return this.jwtService.sign({ userId, username })
  }
}
