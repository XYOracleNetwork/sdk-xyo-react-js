import { Dispatch } from 'react'

import { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver'

export interface PayloadRenderPluginResolverState {
  resolver?: PayloadRenderPluginResolver
  setResolver?: Dispatch<PayloadRenderPluginResolver>
}
