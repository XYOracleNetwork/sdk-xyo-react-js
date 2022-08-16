import { Dispatch } from 'react'

import { XyoPayloadRenderPluginResolver } from '../../XyoPayloadRenderPluginResolver'

export interface PayloadRenderPluginResolverState {
  resolver?: XyoPayloadRenderPluginResolver
  setResolver?: Dispatch<XyoPayloadRenderPluginResolver>
}
