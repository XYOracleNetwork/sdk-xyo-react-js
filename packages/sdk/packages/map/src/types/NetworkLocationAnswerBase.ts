import { Payload } from '@xyo-network/payload-model'
import { Feature, Point, Polygon } from 'geojson'

export interface NetworkLocationAnswerBase<T> extends Payload {
  result: T
}

export type NetworkLocationAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Point>[] }>
export type NetworkLocationHeatmapAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Polygon>[] }>
export type NetworkLocationHeatmapQuadkeyAnswerPayload = NetworkLocationAnswerBase<{ density: number; quadkey: string }[]>
