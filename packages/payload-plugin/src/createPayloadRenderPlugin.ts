import merge from 'lodash/merge'

import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin'
import { XyoPayloadRenderPlugin, XyoPayloadRenderPluginConfig } from './XyoPayloadRenderPlugin'

export const createPayloadRenderPlugin = (plugin: XyoPayloadRenderPluginConfig): XyoPayloadRenderPlugin => {
  return merge({}, DefaultPayloadRenderPlugin, plugin)
}
