import { createContextEx } from '@xyo-network/react-shared'

import type { OpenElevationApiClientState } from './State.ts'

export const OpenElevationApiContext = createContextEx<OpenElevationApiClientState>()
