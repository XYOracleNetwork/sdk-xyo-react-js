import { useContextEx } from '@xyo-network/react-shared'

import { EmbedPluginContext } from './Context'

export const useEmbedPluginState = () => useContextEx(EmbedPluginContext, 'EmbedPlugin', true)
