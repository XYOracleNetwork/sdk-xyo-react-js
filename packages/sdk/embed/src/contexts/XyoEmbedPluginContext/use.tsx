import { useContextEx } from '@xyo-network/react-shared'

import { XyoEmbedPluginContext } from './Context'

export const useXyoEmbedPluginState = () => useContextEx(XyoEmbedPluginContext, 'XyoEmbedPluginContext', true)
