import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { NEST_SECRET } from 'config'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: NEST_SECRET,
    })
  }

  validate (payload: { userId: number; email: string }) {
    const { userId, email } = payload
    return { userId, email }
  }
}
