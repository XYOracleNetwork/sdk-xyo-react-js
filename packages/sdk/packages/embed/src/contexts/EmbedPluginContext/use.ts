import { useContextEx } from '@xylabs/react-shared'

import { EmbedPluginContext } from './Context.ts'

export const useEmbedPluginState = () => useContextEx(EmbedPluginContext, 'EmbedPlugin', true)
