import type { ContextExState } from '@xylabs/react-shared'

export type PluginProps = Record<string, unknown>

export interface PluginPropsStateFields {
  pluginProps: PluginProps | undefined
}

export type PluginPropsState = ContextExState<PluginPropsStateFields>
