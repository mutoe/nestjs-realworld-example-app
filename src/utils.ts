import { NEST_SECRET } from 'config'
import { createHmac } from 'crypto'

export function cryptoPassword (password: string) {
  const hmac = createHmac('sha256', NEST_SECRET)
  return hmac.update(password).digest('hex')
}
