import { ModuleInstance } from '@xyo-network/module'

export type ModuleRenderProps<T extends ModuleInstance = ModuleInstance> = {
  address?: string
  module?: T
  name?: string
}
