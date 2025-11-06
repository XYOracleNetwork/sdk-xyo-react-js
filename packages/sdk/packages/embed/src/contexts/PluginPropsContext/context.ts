import { createContextEx } from '@xylabs/react-shared'

import type { PluginPropsState } from './state.ts'

export const PluginPropsContext = createContextEx<PluginPropsState>()
