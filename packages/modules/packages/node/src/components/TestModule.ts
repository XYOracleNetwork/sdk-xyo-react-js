import { AbstractModuleInstance } from '@xyo-network/module-abstract'
import type { ModuleConfig, ModuleParams } from '@xyo-network/module-model'
import type { Query, Schema } from '@xyo-network/payload-model'

export type TestModuleConfigSchema = 'network.xyo.test.module'
export const TestModuleConfigSchema: TestModuleConfigSchema = 'network.xyo.test.module'

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
