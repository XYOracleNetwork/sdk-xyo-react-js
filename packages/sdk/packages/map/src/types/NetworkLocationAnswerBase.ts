import type { Payload } from '@xyo-network/payload-model'
import { isPayloadOfSchemaType } from '@xyo-network/payload-model'
import type {
  Feature, Point, Polygon,
} from 'geojson'

export interface NetworkLocationAnswerBase<T> {
  result: T
}

export const NetworkLocationAnswerSchema = 'network.xyo.location.range.answer'
export type NetworkLocationAnswerSchema = 'network.xyo.location.range.answer'
export type NetworkLocationAnswerPayload = Payload<NetworkLocationAnswerBase<{ features: Feature<Point>[] }>, NetworkLocationAnswerSchema>
export const isNetworkLocationAnswer = isPayloadOfSchemaType<NetworkLocationAnswerPayload>(NetworkLocationAnswerSchema)

export const NetworkLocationHeatmapAnswerSchema = 'network.xyo.location.heatmap.answer'
export type NetworkLocationHeatmapAnswerSchema = 'network.xyo.location.heatmap.answer'
export type NetworkLocationHeatmapAnswerPayload = Payload<
  NetworkLocationAnswerBase<{ features: Feature<Polygon>[] }>,
  NetworkLocationHeatmapAnswerSchema
>
export const isNetworkLocationHeatmapAnswer = isPayloadOfSchemaType<NetworkLocationHeatmapAnswerPayload>(NetworkLocationHeatmapAnswerSchema)

export const NetworkLocationHeatmapQuadkeyAnswerSchema = 'network.xyo.location.heatmap.quadkey.answer'
export type NetworkLocationHeatmapQuadkeyAnswerSchema = 'network.xyo.location.heatmap.quadkey.answer'
export type NetworkLocationHeatmapQuadkeyAnswerPayload = Payload<
  NetworkLocationAnswerBase<{ density: number; quadkey: string }[]>,
  NetworkLocationHeatmapQuadkeyAnswerSchema
>
export const isNetworkLocationHeatmapQuadkeyAnswer = isPayloadOfSchemaType<NetworkLocationHeatmapAnswerPayload>(
  NetworkLocationHeatmapQuadkeyAnswerSchema,
)
