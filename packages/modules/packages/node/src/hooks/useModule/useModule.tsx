import { Module, ModuleWrapper } from '@xyo-network/module'

import { createUseModuleHook } from './createUseModuleHook'

export const useModule = createUseModuleHook<Module, ModuleWrapper>(ModuleWrapper.wrap)
