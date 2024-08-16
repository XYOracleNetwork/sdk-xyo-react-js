import { createContextEx } from '@xyo-network/react-shared'

import type { PayloadSetPluginResolverState } from './State.ts'

const PayloadSetPluginResolverContext = createContextEx<PayloadSetPluginResolverState>()

export { PayloadSetPluginResolverContext }
