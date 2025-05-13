import { createContextEx } from '@xylabs/react-shared'

import type { WalletServiceState } from './State.ts'

export const WalletServiceContext = createContextEx<WalletServiceState>()
