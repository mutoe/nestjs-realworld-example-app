import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user/user.service'
import { AuthService } from './auth/auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/hello')
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }

  @Post('/auth/register')
  async register (@Body() requestBody: { email: string; username: string; password: string }) {
    const user = await this.userService.createUser(requestBody)
    return { user }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login (@Request() req) {
    const { user } = req
    const token = this.authService.generateToken(user.id, user.username)
    return {
      user: { ...user, token },
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async profile (@Request() req) {
    return req.user
  }
}
