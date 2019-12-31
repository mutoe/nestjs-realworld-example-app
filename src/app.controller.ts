import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/hello')
  healthCheck(@Query() query: Record<string, string> = { name: 'world' }): string {
    return `Hello ${query.name}!`
  }
}
