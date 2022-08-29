import { useContextEx } from '@xyo-network/react-shared'

import { PayloadRenderPluginResolverContext } from './Context'

export const usePayloadRenderPluginResolver = (required = false) => {
  return useContextEx(PayloadRenderPluginResolverContext, 'PayloadRenderPluginResolver', required)
}
