import { createContextEx } from '@xyo-network/react-shared'

import { PayloadPluginResolverState } from './State.js'

const PayloadPluginResolverContext = createContextEx<PayloadPluginResolverState>()

export { PayloadPluginResolverContext }
