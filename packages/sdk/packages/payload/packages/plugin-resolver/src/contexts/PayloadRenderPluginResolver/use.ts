import { useContextEx } from '@xylabs/react-shared'

import { PayloadRenderPluginResolverContext } from './Context.ts'

export const usePayloadRenderPluginResolver = (required = false) => {
  return useContextEx(PayloadRenderPluginResolverContext, 'PayloadRenderPluginResolver', required)
}
