import { createContextEx } from '@xyo-network/react-shared'

import type { PayloadRenderPluginResolverState } from './State.ts'

const PayloadRenderPluginResolverContext = createContextEx<PayloadRenderPluginResolverState>()

export { PayloadRenderPluginResolverContext }
