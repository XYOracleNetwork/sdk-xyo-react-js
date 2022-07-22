import { WithChildren } from '@xylabs/react-shared'
import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivist, XyoArchivistConfig, XyoMemoryArchivist } from '@xyo-network/archivist'
import { useState } from 'react'

import { ArchivistContext } from './Context'
import { useArchivist } from './use'

export interface ArchivistProviderProps {
  required?: boolean
  archivist?: XyoArchivist
}

export const ArchivistProvider: React.FC<WithChildren<ArchivistProviderProps>> = ({ archivist: archivistProp, required = false, children }) => {
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

export interface MemoryArchivistProviderProps {
  required?: boolean
  config?: XyoArchivistConfig
}

export const MemoryArchivistProvider: React.FC<WithChildren<MemoryArchivistProviderProps>> = ({ config = {}, ...props }) => {
  const { archivist } = useArchivist()
  config.parent = config.parent ?? archivist
  return <ArchivistProvider archivist={new XyoMemoryArchivist(config)} {...props} />
}

export interface ApiArchivistProviderProps {
  required?: boolean
  config?: XyoRemoteArchivistConfig
}

export const RemoteArchivistProvider: React.FC<WithChildren<ApiArchivistProviderProps>> = ({ config = {}, ...props }) => {
  const { archivist } = useArchivist()
  config.parent = config.parent ?? archivist
  return <ArchivistProvider archivist={new XyoRemoteArchivist(config)} {...props} />
}
