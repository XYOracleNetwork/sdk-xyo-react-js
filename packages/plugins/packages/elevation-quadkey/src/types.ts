import type { Payload } from '@xyo-network/payload-model'
import { asSchema, isPayloadOfSchemaType } from '@xyo-network/payload-model'
import type { NetworkLocationAnswerBase } from '@xyo-network/react-map-model'

export const NetworkElevationQuadkeyAnswerSchema = asSchema('network.xyo.elevation.map.quadkey.answer', true)
export type NetworkElevationQuadkeyAnswerSchema = typeof NetworkElevationQuadkeyAnswerSchema

export type NetworkElevationQuadkeyAnswerPayload = Payload<
  NetworkLocationAnswerBase<
    {
      elevation: number
      quadkey: string
      schema: NetworkElevationQuadkeyAnswerSchema
    }[]
  >
>

export const isNetworkElevationQuadkeyAnswer = isPayloadOfSchemaType<NetworkElevationQuadkeyAnswerPayload>(NetworkElevationQuadkeyAnswerSchema)
