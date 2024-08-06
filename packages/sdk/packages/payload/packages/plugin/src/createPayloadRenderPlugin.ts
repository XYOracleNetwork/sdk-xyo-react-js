import { merge } from '@xylabs/lodash'

import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin.ts'
import { PayloadRenderPlugin, PayloadRenderPluginConfig } from './PayloadRenderPlugin.ts'

export const createPayloadRenderPlugin = (plugin: PayloadRenderPluginConfig): PayloadRenderPlugin => {
  return merge({}, DefaultPayloadRenderPlugin, plugin)
}
