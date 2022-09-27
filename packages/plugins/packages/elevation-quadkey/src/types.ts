import { NetworkLocationAnswerBase } from '@xyo-network/react-map'

export type NetworkElevationQuadkeyAnswerPayload = NetworkLocationAnswerBase<{ quadkey: string; elevation: number }[]>
