import { AbstractModuleInstance } from '@xyo-network/module-abstract'
import type { ModuleConfig, ModuleParams } from '@xyo-network/module-model'
import {
  asSchema, type Query, type Schema,
} from '@xyo-network/payload-model'

export const TestModuleConfigSchema = asSchema('network.xyo.test.module', true)
export type TestModuleConfigSchema = typeof TestModuleConfigSchema

export class TestModule extends AbstractModuleInstance<ModuleParams<ModuleConfig<{ schema: TestModuleConfigSchema }>>> {
  static override readonly configSchemas: Schema[] = [...super.configSchemas, TestModuleConfigSchema]
  static override readonly defaultConfigSchema: Schema = TestModuleConfigSchema
  get _queryAccountPaths(): Record<Query['schema'], string> {
    return {}
  }
}

export const init = async () => {
  await TestModule.create({ config: { name: 'TestModule', schema: TestModuleConfigSchema } })
}
