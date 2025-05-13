import { createContextEx } from '@xylabs/react-shared'

import type { ModuleRepositoryContextState } from './State.ts'

export const ModuleRepositoryContext = createContextEx<ModuleRepositoryContextState>()
