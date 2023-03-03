import { Module, ModuleWrapper } from '@xyo-network/module'

import { createUseModuleHook, useNode } from './useNode'

export const useModule = createUseModuleHook<Module, ModuleWrapper>(ModuleWrapper.wrap, () => useNode(true))
