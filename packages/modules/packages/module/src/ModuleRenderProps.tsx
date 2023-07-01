import { Module } from '@xyo-network/module'

export type ModuleRenderProps<T extends Module = Module> = {
  address?: string
  module?: T
  name?: string
}
