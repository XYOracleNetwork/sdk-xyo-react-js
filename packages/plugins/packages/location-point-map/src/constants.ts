import { asSchema } from '@xyo-network/payload-model'

export const CurrentLocationSchema = asSchema('network.xyo.location.current', true)
export type CurrentLocationSchema = typeof CurrentLocationSchema
