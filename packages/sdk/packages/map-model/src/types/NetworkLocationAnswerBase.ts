import type { Payload } from '@xyo-network/payload-model'
import { asSchema, isPayloadOfSchemaType } from '@xyo-network/payload-model'
import type {
  Feature, Point, Polygon,
} from 'geojson'

export interface NetworkLocationAnswerBase<T> {
  result: T
}

export const NetworkLocationAnswerSchema = asSchema('network.xyo.location.range.answer', true)
export type NetworkLocationAnswerSchema = typeof NetworkLocationAnswerSchema
export type NetworkLocationAnswerPayload = Payload<NetworkLocationAnswerBase<{ features: Feature<Point>[] }>, NetworkLocationAnswerSchema>
export const isNetworkLocationAnswer = isPayloadOfSchemaType<NetworkLocationAnswerPayload>(NetworkLocationAnswerSchema)

export const NetworkLocationHeatmapAnswerSchema = asSchema('network.xyo.location.heatmap.answer', true)
export type NetworkLocationHeatmapAnswerSchema = typeof NetworkLocationHeatmapAnswerSchema
export type NetworkLocationHeatmapAnswerPayload = Payload<
  NetworkLocationAnswerBase<{ features: Feature<Polygon>[] }>,
  NetworkLocationHeatmapAnswerSchema
>
export const isNetworkLocationHeatmapAnswer = isPayloadOfSchemaType<NetworkLocationHeatmapAnswerPayload>(NetworkLocationHeatmapAnswerSchema)

export const NetworkLocationHeatmapQuadkeyAnswerSchema = asSchema('network.xyo.location.heatmap.quadkey.answer', true)
export type NetworkLocationHeatmapQuadkeyAnswerSchema = typeof NetworkLocationHeatmapQuadkeyAnswerSchema
export type NetworkLocationHeatmapQuadkeyAnswerPayload = Payload<
  NetworkLocationAnswerBase<{ density: number; quadkey: string }[]>,
  NetworkLocationHeatmapQuadkeyAnswerSchema
>
export const isNetworkLocationHeatmapQuadkeyAnswer = isPayloadOfSchemaType<NetworkLocationHeatmapQuadkeyAnswerPayload>(
  NetworkLocationHeatmapQuadkeyAnswerSchema,
)
