import { createContextEx } from '@xyo-network/react-shared'

import type { PayloadDivinerState } from './State.ts'

const PayloadDivinerContext = createContextEx<PayloadDivinerState>()

export { PayloadDivinerContext }
