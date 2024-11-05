import { createContextEx } from '@xyo-network/react-shared'

import type { MapboxAccessTokenContextState } from './State.ts'

export const MapboxAccessTokenContext = createContextEx<MapboxAccessTokenContextState>()
