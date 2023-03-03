import { Module, ModuleWrapper } from '@xyo-network/module'

import { createUseModuleHook } from './createUseModuleHook'
import { useNode } from './useNode'

export const useModule = createUseModuleHook<Module, ModuleWrapper>(ModuleWrapper.wrap, useNode)
