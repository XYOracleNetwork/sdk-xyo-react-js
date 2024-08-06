import { createContextEx } from '@xyo-network/react-shared'

import { WalletServiceState } from './State.ts'

export const WalletServiceContext = createContextEx<WalletServiceState>()
