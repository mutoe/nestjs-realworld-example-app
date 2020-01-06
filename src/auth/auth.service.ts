import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor (private readonly userService: UserService) {}

  async validateUser (username: string, password: string) {
    const user = await this.userService.findOne(username)
    if (user?.password === password) {
      const { password: _, ...profile } = user
      return profile
    }
    return null
  }
}
