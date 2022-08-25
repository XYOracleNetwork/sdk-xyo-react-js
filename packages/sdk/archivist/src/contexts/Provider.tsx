import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivist, XyoMemoryArchivist, XyoMemoryArchivistConfig } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { ArchivistContext } from './Context'
import { useArchivist } from './use'

export type ArchivistProviderProps = ContextExProviderProps<{
  archivist?: XyoArchivist
}>

export const ArchivistProvider: React.FC<ArchivistProviderProps> = ({ archivist: archivistProp, required = false, children }) => {
  const [archivist, setArchivist] = useState<XyoArchivist | undefined>(archivistProp)

  useEffect(() => {
    setArchivist(archivistProp)
  }, [archivistProp])

  return (
    <ArchivistContext.Provider
      value={{
        archivist,
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
  const memoryArchivistConfig: XyoMemoryArchivistConfig = { ...config }
  memoryArchivistConfig.parents = memoryArchivistConfig.parents ?? {}
  memoryArchivistConfig.parents.read = memoryArchivistConfig.parents.read ?? {}
  if (archivist) {
    memoryArchivistConfig.parents.read[archivist.address] = archivist
  }
  return <ArchivistProvider archivist={new XyoMemoryArchivist(config)} {...props} />
}

export type ApiArchivistProviderProps = ContextExProviderProps<{
  config: XyoRemoteArchivistConfig
}>

export const RemoteArchivistProvider: React.FC<ApiArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  const remoteArchivistConfig: XyoRemoteArchivistConfig = { ...config }
  remoteArchivistConfig.parents = remoteArchivistConfig.parents ?? {}
  remoteArchivistConfig.parents.read = remoteArchivistConfig.parents.read ?? {}
  if (archivist) {
    remoteArchivistConfig.parents.read[archivist.address] = archivist
  }
  return <ArchivistProvider archivist={new XyoRemoteArchivist(config)} {...props} />
}
