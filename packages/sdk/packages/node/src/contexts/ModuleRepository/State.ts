import { ModuleRepository } from '@xyo-network/module-model'
import { ContextExState } from '@xyo-network/react-shared'

export interface ResolverEntries {
  [name: string]: ModuleRepository
}

export interface ModuleRepositoryContextState extends ContextExState {
  removeResolvers?: (names?: string[]) => boolean
  resolvers?: ResolverEntries
  updateResolvers?: (resolvers: ResolverEntries) => boolean
}
