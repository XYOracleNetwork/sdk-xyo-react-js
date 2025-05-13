import type { ContextExState } from '@xylabs/react-shared'
import type { ModuleResolver } from '@xyo-network/module-model'

export interface ResolverEntries {
  [name: string]: ModuleResolver
}

export type ModuleRepositoryContextState = ContextExState<{
  removeResolvers?: (names?: string[]) => boolean
  resolvers?: ResolverEntries
  updateResolvers?: (resolvers: ResolverEntries) => boolean
}>
