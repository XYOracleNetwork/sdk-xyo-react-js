import { createContextEx } from '@xylabs/react-shared'

import type { WalletContextState } from './State.ts'

export const WalletContext = createContextEx<WalletContextState>()
