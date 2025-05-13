import { createContextEx } from '@xylabs/react-shared'

import type { PayloadDivinerState } from './State.ts'

const PayloadDivinerContext = createContextEx<PayloadDivinerState>()

export { PayloadDivinerContext }
