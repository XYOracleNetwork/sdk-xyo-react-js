import { Dispatch } from 'react'

import { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.ts'

export interface PayloadRenderPluginResolverState {
  resolver?: PayloadRenderPluginResolver
  setResolver?: Dispatch<PayloadRenderPluginResolver>
}
