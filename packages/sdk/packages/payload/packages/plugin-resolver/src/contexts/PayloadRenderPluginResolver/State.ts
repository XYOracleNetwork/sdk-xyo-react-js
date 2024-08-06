import { Dispatch } from 'react'

import { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.tsx'

export interface PayloadRenderPluginResolverState {
  resolver?: PayloadRenderPluginResolver
  setResolver?: Dispatch<PayloadRenderPluginResolver>
}
