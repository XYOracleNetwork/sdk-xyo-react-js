import { XyoPayload } from '@xyo-network/payload-model'
import { Feature, Point, Polygon } from 'geojson'

export interface NetworkLocationAnswerBase<T> extends XyoPayload {
  result: T
}

export type NetworkXyoLocationAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Point>[] }>
export type NetworkXyoLocationHeatmapAnswerPayload = NetworkLocationAnswerBase<{ features: Feature<Polygon>[] }>
export type NetworkXyoLocationHeatmapQuadkeyAnswerPayload = NetworkLocationAnswerBase<{ quadkey: string; density: number }[]>
