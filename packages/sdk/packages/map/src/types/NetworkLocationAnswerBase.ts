import { Payload } from '@xyo-network/payload-model'
import { Feature, Point, Polygon } from 'geojson'

export interface NetworkLocationAnswerBase<T> extends Payload {
  result: T
}

export type NetworkXyoLocationAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Point>[] }>
export type NetworkXyoLocationHeatmapAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Polygon>[] }>
export type NetworkXyoLocationHeatmapQuadkeyAnswerPayload = NetworkLocationAnswerBase<{ density: number; quadkey: string }[]>
