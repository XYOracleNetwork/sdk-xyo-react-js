import type { Payload } from '@xyo-network/payload-model'
import { isPayloadOfSchemaType } from '@xyo-network/payload-model'
import type { NetworkLocationAnswerBase } from '@xyo-network/react-map-model'

export const NetworkElevationQuadkeyAnswerSchema = 'network.xyo.elevation.map.quadkey.answer' as const
export type NetworkElevationQuadkeyAnswerSchema = 'network.xyo.elevation.map.quadkey.answer'

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
