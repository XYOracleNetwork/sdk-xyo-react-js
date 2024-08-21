import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin.ts'
import type { PayloadRenderPlugin, PayloadRenderPluginConfig } from './PayloadRenderPlugin.ts'

export const createPayloadRenderPlugin = (plugin: PayloadRenderPluginConfig): PayloadRenderPlugin => {
  return {
    ...DefaultPayloadRenderPlugin, ...plugin,
  } as PayloadRenderPlugin
}
