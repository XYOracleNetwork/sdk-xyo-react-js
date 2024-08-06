import { ModuleRepositoryContext } from '@xyo-network/react-node-context'
import { useContextEx } from '@xyo-network/react-shared'

export const useModuleRepository = (required = false) => useContextEx(ModuleRepositoryContext, 'ModuleRepository', required)
