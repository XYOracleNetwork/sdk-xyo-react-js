import { createContextEx } from '@xyo-network/react-shared'

import type { PayloadContextState } from './State.ts'

export const PayloadContext = createContextEx<PayloadContextState>()
