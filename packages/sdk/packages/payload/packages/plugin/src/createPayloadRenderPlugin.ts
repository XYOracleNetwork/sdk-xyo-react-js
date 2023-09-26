import { merge } from '@xylabs/lodash'

import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin'
import { PayloadRenderPlugin, PayloadRenderPluginConfig } from './PayloadRenderPlugin'

export const createPayloadRenderPlugin = (plugin: PayloadRenderPluginConfig): PayloadRenderPlugin => {
  return merge({}, DefaultPayloadRenderPlugin, plugin)
}
