import { createContextEx } from '@xyo-network/react-shared'

import { NetworkContextState } from './State.ts'

export const NetworkContext = createContextEx<NetworkContextState>()
