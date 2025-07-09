import { createContextEx } from '@xylabs/react-shared'

import type { WalletContextState } from './State.ts'

/** @public */
export const WalletContext = createContextEx<WalletContextState>()
