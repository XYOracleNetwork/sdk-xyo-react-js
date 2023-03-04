import { Module, ModuleWrapper } from '@xyo-network/module'

import { createUseModuleHook, useNode } from './useNode'

export const useModule = createUseModuleHook<Module, ModuleWrapper>((module) => ModuleWrapper.tryWrap(module), useNode)
