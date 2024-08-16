import { createContextEx } from '@xyo-network/react-shared'

import type { ModuleRepositoryContextState } from './State.ts'

export const ModuleRepositoryContext = createContextEx<ModuleRepositoryContextState>()
