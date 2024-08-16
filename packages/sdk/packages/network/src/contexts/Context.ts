import { createContextEx } from '@xyo-network/react-shared'

import type { NetworkContextState } from './State.ts'

export const NetworkContext = createContextEx<NetworkContextState>()
