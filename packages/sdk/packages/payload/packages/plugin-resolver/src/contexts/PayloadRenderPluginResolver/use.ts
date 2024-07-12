import { useContextEx } from '@xyo-network/react-shared'

import { PayloadRenderPluginResolverContext } from './Context.js'

export const usePayloadRenderPluginResolver = (required = false) => {
  return useContextEx(PayloadRenderPluginResolverContext, 'PayloadRenderPluginResolver', required)
}
