import { createContextEx } from '@xyo-network/react-shared'

import type { WalletServiceState } from './State.ts'

export const WalletServiceContext = createContextEx<WalletServiceState>()
