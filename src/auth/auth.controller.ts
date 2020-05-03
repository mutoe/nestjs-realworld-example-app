import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthRO } from 'auth/auth.interface'
import { LoginDto } from 'auth/dto/login.dto'
import { RegisterDto } from 'auth/dto/register.dto'
import { UserService } from 'user/user.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register (@Body() registerDto: RegisterDto): Promise<AuthRO> {
    const userProfile = await this.authService.register(registerDto)
    return {
      user: userProfile,
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login (@Body() loginDto: LoginDto): Promise<AuthRO> {
    const userProfile = await this.authService.login(loginDto)
    return {
      user: userProfile,
    }
  }
}
