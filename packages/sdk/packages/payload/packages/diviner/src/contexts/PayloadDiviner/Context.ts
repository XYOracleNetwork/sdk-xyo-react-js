import { createContextEx } from '@xyo-network/react-shared'

import { PayloadDivinerState } from './State.ts'

const PayloadDivinerContext = createContextEx<PayloadDivinerState>()

export { PayloadDivinerContext }
