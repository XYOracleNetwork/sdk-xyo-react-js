import { createContextEx } from '@xylabs/react-shared'

import type { PayloadRenderPluginResolverState } from './State.ts'

const PayloadRenderPluginResolverContext = createContextEx<PayloadRenderPluginResolverState>()

export { PayloadRenderPluginResolverContext }
