import { useContextEx } from '@xyo-network/react-shared'

import { PayloadSetPluginResolverContext } from './Context.ts'

export const usePayloadSetPluginResolver = (required = false) => {
  return useContextEx(PayloadSetPluginResolverContext, 'PayloadSetPluginResolver', required)
}
