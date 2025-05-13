import { createContextEx } from '@xylabs/react-shared'

import type { MapboxAccessTokenContextState } from './State.ts'

export const MapboxAccessTokenContext = createContextEx<MapboxAccessTokenContextState>()
