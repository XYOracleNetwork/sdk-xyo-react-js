import { ModuleWrapper } from '@xyo-network/module'

import { WrappedModuleHookFactory } from './WrappedModuleHookFactory'

export const useWrappedModule = WrappedModuleHookFactory.create(ModuleWrapper, 'useWrappedModule')
