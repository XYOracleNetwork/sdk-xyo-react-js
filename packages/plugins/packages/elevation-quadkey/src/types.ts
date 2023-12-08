import { isPayloadOfSchemaType, Payload } from '@xyo-network/payload-model'
import { NetworkLocationAnswerBase } from '@xyo-network/react-map'

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
