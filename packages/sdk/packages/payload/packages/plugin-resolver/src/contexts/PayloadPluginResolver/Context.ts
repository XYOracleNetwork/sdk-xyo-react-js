import { createContextEx } from '@xyo-network/react-shared'

import { PayloadPluginResolverState } from './State.ts'

const PayloadPluginResolverContext = createContextEx<PayloadPluginResolverState>()

export { PayloadPluginResolverContext }
