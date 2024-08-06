import { createContextEx } from '@xyo-network/react-shared'

import { ModuleRepositoryContextState } from './State.ts'

export const ModuleRepositoryContext = createContextEx<ModuleRepositoryContextState>()
