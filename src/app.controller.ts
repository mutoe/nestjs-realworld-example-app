import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) {}

  @Get('/hello')
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }

  @Post('/auth/register')
  register (@Body() requestBody: { email: string; username: string; password: string }) {
    return this.appService.createUser(requestBody)
  }
}
