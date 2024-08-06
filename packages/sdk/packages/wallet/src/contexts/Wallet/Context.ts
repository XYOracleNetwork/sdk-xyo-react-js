import { createContextEx } from '@xyo-network/react-shared'

import { WalletContextState } from './State.ts'

export const WalletContext = createContextEx<WalletContextState>()
