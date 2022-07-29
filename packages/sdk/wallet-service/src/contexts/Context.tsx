import { createContextEx } from '@xyo-network/react-shared'

import { WalletServiceState } from './State'

export const WalletServiceContext = createContextEx<WalletServiceState>()
