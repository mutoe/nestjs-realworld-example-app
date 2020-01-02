import { Controller, Get, Query } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('/hello')
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }
}
