import { useContextEx } from '@xyo-network/react-shared'

import { PayloadRenderPluginResolverContext } from './Context.ts'

export const usePayloadRenderPluginResolver = (required = false) => {
  return useContextEx(PayloadRenderPluginResolverContext, 'PayloadRenderPluginResolver', required)
}
