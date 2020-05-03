import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthData } from 'auth/auth.interface'
import { LoginDto } from 'auth/dto/login.dto'
import { RegisterDto } from 'auth/dto/register.dto'
import { omit } from 'lodash'
import { UserEntity } from 'user/user.entity'
import { UserService } from 'user/user.service'
import { cryptoPassword } from 'utils'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register (registerDto: RegisterDto): Promise<AuthData> {
    let user: UserEntity
    user = await this.userService.findUser({ username: registerDto.username })
    if (user?.id) {
      throw new BadRequestException('username is exist')
    }
    user = await this.userService.findUser({ email: registerDto.email })
    if (user?.id) {
      throw new BadRequestException('email is exist')
    }
    const profile = await this.userService.createUser(registerDto)
    const token = this.generateToken(profile.id, profile.email)
    return { ...profile, token }
  }

  async login (loginDto: LoginDto): Promise<AuthData> {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    const token = this.generateToken(user.id, user.email)
    return { ...user, token }
  }

  async validateUser (email: string, password: string) {
    const user = await this.userService.findUser({ email }, true)
    if (!user) {
      throw new BadRequestException('user is not exist')
    }
    if (user.password !== cryptoPassword(password)) {
      throw new BadRequestException('password is invalid')
    }
    return omit(user, 'password')
  }

  generateToken (userId: number, email: string) {
    return this.jwtService.sign({ userId, email })
  }
}
