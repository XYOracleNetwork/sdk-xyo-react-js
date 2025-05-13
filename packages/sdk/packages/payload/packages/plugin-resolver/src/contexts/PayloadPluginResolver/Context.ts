import { createContextEx } from '@xylabs/react-shared'

import type { PayloadPluginResolverState } from './State.ts'

const PayloadPluginResolverContext = createContextEx<PayloadPluginResolverState>()

export { PayloadPluginResolverContext }
