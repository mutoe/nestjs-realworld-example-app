import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user/user.service'

@Controller()
export class AppController {
  constructor (private readonly userService: UserService) {}

  @Get('/hello')
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }

  @Post('/auth/register')
  register (@Body() requestBody: { email: string; username: string; password: string }) {
    return this.userService.createUser(requestBody)
  }
}
