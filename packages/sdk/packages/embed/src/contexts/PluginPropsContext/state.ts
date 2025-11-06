import type { ContextExState } from '@xylabs/react-shared'

export type PluginProps = React.PropsWithChildren

export interface PluginPropsStateFields {
  pluginProps: Record<string, unknown>
}

export type PluginPropsState = ContextExState<PluginPropsStateFields>
