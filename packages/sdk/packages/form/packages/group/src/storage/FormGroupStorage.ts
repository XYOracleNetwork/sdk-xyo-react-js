import { Promisable } from '@xylabs/promise'
import { Payload } from '@xyo-network/payload-model'

export interface FormGroupStorage<TValue extends Payload = Payload> {
  clear: () => Promisable<void>
  get: () => Promisable<TValue | undefined>
  insert: (state: TValue) => Promisable<void>
}
