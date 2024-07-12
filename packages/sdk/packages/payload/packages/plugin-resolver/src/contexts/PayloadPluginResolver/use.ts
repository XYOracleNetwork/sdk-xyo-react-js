import { useContextEx } from '@xyo-network/react-shared'

import { PayloadPluginResolverContext } from './Context.js'

export const usePayloadPluginResolver = (required = false) => {
  return useContextEx(PayloadPluginResolverContext, 'PayloadPluginResolver', required)
}
