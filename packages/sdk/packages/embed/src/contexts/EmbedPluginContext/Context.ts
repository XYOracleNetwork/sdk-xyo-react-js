import { createContextEx } from '@xylabs/react-shared'

import type { EmbedPluginState } from './State.ts'

export const EmbedPluginContext = createContextEx<EmbedPluginState>()
