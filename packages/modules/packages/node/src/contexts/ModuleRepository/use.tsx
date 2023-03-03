import { useContextEx } from '@xyo-network/react-shared'

import { ModuleRepositoryContext } from './Context'

export const useModuleRepository = (required = false) => useContextEx(ModuleRepositoryContext, 'ModuleRepository', required)
