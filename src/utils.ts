import * as crypto from 'crypto'
import { NEST_SECRET } from './config'

export function cryptoPassword (password: string) {
  const hmac = crypto.createHmac('sha256', NEST_SECRET)
  return hmac.update(password).digest('hex')
}
