import { NetworkLocationAnswerBase } from '@xyo-network/react-map'

export type NetworkElevationQuadkeyAnswerPayload = NetworkLocationAnswerBase<{ elevation: number; quadkey: string }[]>
