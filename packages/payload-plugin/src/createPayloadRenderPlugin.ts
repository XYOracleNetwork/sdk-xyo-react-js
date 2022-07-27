import { DefaultPayloadRenderPlugin } from './DefaultPayloadRenderPlugin'
import { XyoPayloadRenderPlugin, XyoPayloadRenderPluginBase, XyoPayloadRenderPluginComponents } from './XyoPayloadRenderPlugin'

export const createPayloadRenderPlugin = (plugin: XyoPayloadRenderPluginBase & Partial<XyoPayloadRenderPluginComponents>): XyoPayloadRenderPlugin => {
  return { ...DefaultPayloadRenderPlugin, ...plugin }
}
