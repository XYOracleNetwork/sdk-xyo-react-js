import { createContextEx } from '@xyo-network/react-shared'

import type { WalletContextState } from './State.ts'

export const WalletContext = createContextEx<WalletContextState>()
