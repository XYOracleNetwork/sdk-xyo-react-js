import { createContextEx } from '@xyo-network/react-shared'

import { WalletServiceState } from './State.js'

export const WalletServiceContext = createContextEx<WalletServiceState>()
