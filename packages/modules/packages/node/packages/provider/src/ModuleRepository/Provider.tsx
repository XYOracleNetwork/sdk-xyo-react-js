import type { WithChildren } from '@xylabs/react-shared'
import type { ResolverEntries } from '@xyo-network/react-node-context'
import { ModuleRepositoryContext } from '@xyo-network/react-node-context'
import React, { useEffect, useState } from 'react'

export interface ModuleRepositoryProviderProps extends WithChildren {
  defaultResolvers?: ResolverEntries
}

export const ModuleRepositoryProvider: React.FC<ModuleRepositoryProviderProps> = ({
  children, defaultResolvers,
}) => {
  const [resolvers, setResolvers] = useState<ResolverEntries | undefined>(defaultResolvers)

  useEffect(() => {
    setResolvers(defaultResolvers)
  }, [defaultResolvers])

  const updateResolvers = (resolverEntries?: ResolverEntries) => {
    if (resolverEntries) {
      setResolvers(resolvers => ({
        ...resolvers,
        ...resolverEntries,
      }))
      return true
    } else {
      return false
    }
  }

  const removeResolvers = (names?: string[]) => {
    if (names?.length) {
      setResolvers((resolvers) => {
        if (resolvers) {
          for (const name of names) {
            delete resolvers[name]
          }
          return { ...resolvers }
        }
      })
      return true
    } else {
      return false
    }
  }

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <ModuleRepositoryContext.Provider value={{
      provided: true, removeResolvers, resolvers, updateResolvers,
    }}
    >
      {children}
    </ModuleRepositoryContext.Provider>
  )
}
