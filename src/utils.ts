import { createHmac } from 'node:crypto'
import { NEST_SECRET } from 'config'

export function cryptoPassword (password: string): string {
  const hmac = createHmac('sha256', NEST_SECRET)
  return hmac.update(password).digest('hex')
}
