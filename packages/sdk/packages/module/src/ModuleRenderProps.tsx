import { Module } from '@xyo-network/module'

export interface ModuleRenderProps<T extends Module = Module> {
  module?: T
}
