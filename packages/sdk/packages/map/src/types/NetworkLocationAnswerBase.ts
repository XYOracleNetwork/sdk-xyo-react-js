import { isPayloadOfSchemaType, Payload } from '@xyo-network/payload-model'
import { Feature, Point, Polygon } from 'geojson'

export interface NetworkLocationAnswerBase<T> {
  result: T
}

export const NetworkLocationAnswerSchema = 'network.xyo.location.range.answer'
export type NetworkLocationAnswerSchema = 'network.xyo.location.range.answer'
export type NetworkLocationAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Point>[] }> &
  Payload<{ schema: NetworkLocationAnswerSchema }>
export const isNetworkLocationAnswer = isPayloadOfSchemaType<NetworkLocationAnswerPayload>(NetworkLocationAnswerSchema)

export const NetworkLocationHeatmapAnswerSchema = 'network.xyo.location.heatmap.answer'
export type NetworkLocationHeatmapAnswerSchema = 'network.xyo.location.heatmap.answer'
export type NetworkLocationHeatmapAnswerPayload = Payload<{
  schema: NetworkLocationHeatmapAnswerSchema & NetworkLocationAnswerBase<{ features: Feature<Polygon>[] }>
}>
export const isNetworkLocationHeatmapAnswer = isPayloadOfSchemaType<NetworkLocationHeatmapAnswerPayload>(NetworkLocationHeatmapAnswerSchema)

export const NetworkLocationHeatmapQuadkeyAnswerSchema = 'network.xyo.location.heatmap.quadkey.answer'
export type NetworkLocationHeatmapQuadkeyAnswerSchema = 'network.xyo.location.heatmap.quadkey.answer'
export type NetworkLocationHeatmapQuadkeyAnswerPayload = Payload<
  {
    schema: NetworkLocationHeatmapQuadkeyAnswerSchema
  } & NetworkLocationAnswerBase<{ density: number; quadkey: string }[]>
>
export const isNetworkLocationHeatmapQuadkeyAnswer = isPayloadOfSchemaType<NetworkLocationHeatmapAnswerPayload>(
  NetworkLocationHeatmapQuadkeyAnswerSchema,
)
