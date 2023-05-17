import { WithChildren } from '@xylabs/react-shared'
import { ModuleRepositoryContext, ResolverEntries } from '@xyo-network/react-node-context'
import { useEffect, useState } from 'react'

export interface ModuleRepositoryProviderProps extends WithChildren {
  defaultResolvers?: ResolverEntries
}

export const ModuleRepositoryProvider: React.FC<ModuleRepositoryProviderProps> = ({ children, defaultResolvers }) => {
  const [resolvers, setResolvers] = useState<ResolverEntries | undefined>(defaultResolvers)

  useEffect(() => {
    setResolvers(defaultResolvers)
  }, [defaultResolvers])

  const updateResolvers = (resolverEntries?: ResolverEntries) => {
    if (resolverEntries) {
      setResolvers((resolvers) => ({
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
          names.forEach((name) => {
            delete resolvers[name]
          })
          return { ...resolvers }
        }
      })
      return true
    } else {
      return false
    }
  }

  return (
    <ModuleRepositoryContext.Provider value={{ provided: true, removeResolvers, resolvers, updateResolvers }}>
      {children}
    </ModuleRepositoryContext.Provider>
  )
}
