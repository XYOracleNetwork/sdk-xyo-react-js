import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch } from 'react'

import type { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.ts'

export type PayloadRenderPluginResolverState = ContextExState<{
  resolver?: PayloadRenderPluginResolver
  setResolver?: Dispatch<PayloadRenderPluginResolver>
}>
