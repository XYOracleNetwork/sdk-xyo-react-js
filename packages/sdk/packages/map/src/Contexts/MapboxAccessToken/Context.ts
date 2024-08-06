import { createContextEx } from '@xyo-network/react-shared'

import { MapboxAccessTokenContextState } from './State.ts'

export const MapboxAccessTokenContext = createContextEx<MapboxAccessTokenContextState>()
