import { createContextEx } from '@xyo-network/react-shared'

import type { EmbedPluginState } from './State.ts'

export const EmbedPluginContext = createContextEx<EmbedPluginState>()
