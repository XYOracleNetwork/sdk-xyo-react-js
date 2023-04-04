import { CompositeModuleResolver } from '@xyo-network/module'
import { ContextExState } from '@xyo-network/react-shared'

export interface ResolverEntries {
  [name: string]: CompositeModuleResolver
}

export interface ModuleRepositoryContextState extends ContextExState {
  removeResolvers?: (names?: string[]) => boolean
  resolvers?: ResolverEntries
  updateResolvers?: (resolvers: ResolverEntries) => boolean
}
