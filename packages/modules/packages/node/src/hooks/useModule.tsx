import { Module, ModuleWrapper } from '@xyo-network/module'

import { createUseModuleHook } from './useNode'

export const useModule = createUseModuleHook<Module, ModuleWrapper>((module) => ModuleWrapper.tryWrap(module))
