import { Controller, Get, Query } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

@Controller()
export class AppController {
  @Get('/hello')
  @ApiQuery({ name: 'name', required: false })
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }
}
