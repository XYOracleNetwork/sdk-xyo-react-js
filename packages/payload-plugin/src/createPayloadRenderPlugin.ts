import merge from 'lodash/merge'

import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin'
import { XyoPayloadRenderPlugin, XyoPayloadRenderPluginConfig } from './XyoPayloadRenderPlugin'

export const createPayloadRenderPlugin = <R extends XyoPayloadRenderPlugin = XyoPayloadRenderPlugin, C extends R & XyoPayloadRenderPluginConfig = R & XyoPayloadRenderPluginConfig>(
  plugin: C
): R => {
  return merge({}, DefaultPayloadRenderPlugin, plugin)
}
