import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivist, XyoMemoryArchivist, XyoMemoryArchivistConfig } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useEffect, useState } from 'react'

import { ArchivistContext } from './Context'
import { useArchivist } from './use'

export type ArchivistProviderProps = ContextExProviderProps<{
  archivist?: XyoArchivist
}>

export const ArchivistProvider: React.FC<ArchivistProviderProps> = ({ archivist: archivistProp, required = false, children }) => {
  const [archivist, setArchivist] = useState<XyoArchivist>()

  useEffect(() => {
    setArchivist(archivistProp)
  }, [archivistProp])

  return (
    <ArchivistContext.Provider
      value={{
        archivist: archivist !== archivistProp ? undefined : archivist,
        provided: true,
        setArchivist,
      }}
    >
      {archivist ? children : required ? null : children}
    </ArchivistContext.Provider>
  )
}

export type MemoryArchivistProviderProps = ContextExProviderProps<{
  config: XyoMemoryArchivistConfig
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  return (
    <ArchivistProvider
      archivist={
        new XyoMemoryArchivist(
          merge(
            config,
            archivist
              ? {
                  parents: {
                    read: {
                      [archivist.address]: archivist,
                    },
                  },
                }
              : undefined,
          ),
        )
      }
      {...props}
    />
  )
}

export type ApiArchivistProviderProps = ContextExProviderProps<{
  config: XyoRemoteArchivistConfig
}>

export const RemoteArchivistProvider: React.FC<ApiArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  return (
    <ArchivistProvider
      archivist={
        new XyoRemoteArchivist(
          merge(
            config,
            archivist
              ? {
                  parents: {
                    read: {
                      [archivist.address]: archivist,
                    },
                  },
                }
              : undefined,
          ),
        )
      }
      {...props}
    />
  )
}
