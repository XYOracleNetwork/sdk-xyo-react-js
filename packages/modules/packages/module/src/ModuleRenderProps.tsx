import { ModuleInstance } from '@xyo-network/module-model'

export type ModuleRenderProps<T extends ModuleInstance = ModuleInstance> = {
  address?: string
  mod?: T
  name?: string
}
