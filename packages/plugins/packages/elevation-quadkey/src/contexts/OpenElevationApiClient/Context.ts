import { createContextEx } from '@xyo-network/react-shared'

import { OpenElevationApiClientState } from './State.ts'

export const OpenElevationApiContext = createContextEx<OpenElevationApiClientState>()
