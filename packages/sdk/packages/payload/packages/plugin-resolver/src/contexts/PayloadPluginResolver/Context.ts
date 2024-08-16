import { createContextEx } from '@xyo-network/react-shared'

import type { PayloadPluginResolverState } from './State.ts'

const PayloadPluginResolverContext = createContextEx<PayloadPluginResolverState>()

export { PayloadPluginResolverContext }
