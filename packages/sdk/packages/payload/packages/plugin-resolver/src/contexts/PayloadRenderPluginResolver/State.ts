import type { Dispatch } from 'react'

import type { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.ts'

export interface PayloadRenderPluginResolverState {
  resolver?: PayloadRenderPluginResolver
  setResolver?: Dispatch<PayloadRenderPluginResolver>
}
