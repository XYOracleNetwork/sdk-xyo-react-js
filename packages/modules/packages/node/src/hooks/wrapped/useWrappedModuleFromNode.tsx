import { ModuleWrapper } from '@xyo-network/module'

import { WrappedModuleFromNodeHookFactory } from './WrappedModuleFromNodeHookFactory'

export const useWrappedModuleFromNode = WrappedModuleFromNodeHookFactory.create(ModuleWrapper, 'useWrappedNodeModule')
