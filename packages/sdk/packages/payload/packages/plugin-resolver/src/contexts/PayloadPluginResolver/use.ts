import { useContextEx } from '@xylabs/react-shared'

import { PayloadPluginResolverContext } from './Context.ts'

export const usePayloadPluginResolver = (required = false) => {
  return useContextEx(PayloadPluginResolverContext, 'PayloadPluginResolver', required)
}
