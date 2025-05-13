import { createContextEx } from '@xylabs/react-shared'

import type { NetworkContextState } from './State.ts'

export const NetworkContext = createContextEx<NetworkContextState>()
