import { createContextEx } from '@xylabs/react-shared'

import type { PayloadContextState } from './State.ts'

export const PayloadContext = createContextEx<PayloadContextState>()
