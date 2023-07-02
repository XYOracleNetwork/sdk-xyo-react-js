import { ModuleWrapper } from '@xyo-network/module'

import { WrappedModulesHookFactory } from './WrappedModulesHookFactory'

export const useWrappedModules = WrappedModulesHookFactory.create(ModuleWrapper, 'useWrappedModules')
