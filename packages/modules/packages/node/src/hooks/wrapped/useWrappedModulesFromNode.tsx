import { ModuleWrapper } from '@xyo-network/module'

import { WrappedModulesFromNodeHookFactory } from './WrappedModulesFromNodeHookFactory'

export const useWrappedModulesFromNode = WrappedModulesFromNodeHookFactory.create(ModuleWrapper, 'useWrappedModulesFromNode')
