import { assertEx } from '@xylabs/sdk-js'
import { XyoPayload } from '@xyo-network/payload-model'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export class XyoPayloadRenderPluginResolver {
  protected plugins: XyoPayloadRenderPlugin[] = []
  protected schemaDefaultPlugin = new Map<string, XyoPayloadRenderPlugin>()

  public register(plugin: XyoPayloadRenderPlugin, defaultForSchema?: string[]) {
    this.plugins.push(plugin)
    defaultForSchema?.forEach((schema) => {
      assertEx(plugin.canRender({ schema }), 'Default renderer must be able to render schema')
      this.schemaDefaultPlugin.set(schema, plugin)
    })
    return this
  }

  public resolve(payload: XyoPayload) {
    return this.schemaDefaultPlugin.get(payload.schema) ?? [...this.plugins.values()].find((plugin) => plugin.canRender(payload))
  }

  public list(payload?: XyoPayload) {
    if (!payload) {
      return this.plugins
    }
    const defaultPlugin = this.schemaDefaultPlugin.get(payload.schema)
    const result = defaultPlugin ? [defaultPlugin] : []
    this.plugins.some((plugin) => {
      if (defaultPlugin !== plugin && plugin.canRender(payload)) {
        result.push(plugin)
      }
    })
    return result
  }
}
