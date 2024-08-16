import { assertEx } from '@xylabs/assert'
import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export class PayloadRenderPluginResolver {
  protected plugins: PayloadRenderPlugin[] = []
  protected schemaDefaultPlugin = new Map<string, PayloadRenderPlugin>()

  list(payload?: Payload) {
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

  register(plugin: PayloadRenderPlugin, defaultForSchema?: string[]) {
    this.plugins.push(plugin)
    if (defaultForSchema)
      for (const schema of defaultForSchema) {
        assertEx(plugin.canRender({ schema }), () => 'Default renderer must be able to render schema')
        this.schemaDefaultPlugin.set(schema, plugin)
      }
    return this
  }

  resolve(payload: Payload) {
    return this.schemaDefaultPlugin.get(payload.schema) ?? [...this.plugins.values()].find(plugin => plugin.canRender(payload))
  }
}
