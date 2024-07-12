import { Dispatch } from 'react'

import { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.js'

export interface PayloadRenderPluginResolverState {
  resolver?: PayloadRenderPluginResolver
  setResolver?: Dispatch<PayloadRenderPluginResolver>
}
