import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello (): string {
    return 'Hello World!'
  }

  createUser (user: { email: string; username: string; password: string }): any {
    throw new Error('Method not implemented.')
  }
}
