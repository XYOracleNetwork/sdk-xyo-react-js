import { useContextEx } from '@xyo-network/react-shared'

import { EmbedPluginContext } from './Context.ts'

export const useEmbedPluginState = () => useContextEx(EmbedPluginContext, 'EmbedPlugin', true)
