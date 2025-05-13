import { createContextEx } from '@xylabs/react-shared'

import type { OpenElevationApiClientState } from './State.ts'

export const OpenElevationApiContext = createContextEx<OpenElevationApiClientState>()
