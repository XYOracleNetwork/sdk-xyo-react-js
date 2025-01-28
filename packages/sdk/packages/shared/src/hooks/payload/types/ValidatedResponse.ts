import type { Payload } from '@xyo-network/payload-model'

export type ValidatedResponse<T extends Payload = Payload> = { errors?: Error[]; payload?: T }
