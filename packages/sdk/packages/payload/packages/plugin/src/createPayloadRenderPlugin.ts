import { merge } from '@xylabs/lodash'

import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin.js'
import { PayloadRenderPlugin, PayloadRenderPluginConfig } from './PayloadRenderPlugin.js'

export const createPayloadRenderPlugin = (plugin: PayloadRenderPluginConfig): PayloadRenderPlugin => {
  return merge({}, DefaultPayloadRenderPlugin, plugin)
}
