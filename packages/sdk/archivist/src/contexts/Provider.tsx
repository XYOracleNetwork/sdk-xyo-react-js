import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivist, XyoArchivistConfig, XyoMemoryArchivist } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ArchivistContext } from './Context'
import { useArchivist } from './use'

export type ArchivistProviderProps = ContextExProviderProps<{
  archivist?: XyoArchivist
}>

export const ArchivistProvider: React.FC<ArchivistProviderProps> = ({ archivist: archivistProp, required = false, children }) => {
  const [archivist, setArchivist] = useState<XyoArchivist | undefined>(archivistProp)

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
  config?: XyoArchivistConfig
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config = {}, ...props }) => {
  const { archivist } = useArchivist()
  config.parent = config.parent ?? archivist
  return <ArchivistProvider archivist={new XyoMemoryArchivist(config)} {...props} />
}

export type ApiArchivistProviderProps = ContextExProviderProps<{
  config?: XyoRemoteArchivistConfig
}>

export const RemoteArchivistProvider: React.FC<ApiArchivistProviderProps> = ({ config = {}, ...props }) => {
  const { archivist } = useArchivist()
  config.parent = config.parent ?? archivist
  return <ArchivistProvider archivist={new XyoRemoteArchivist(config)} {...props} />
}
