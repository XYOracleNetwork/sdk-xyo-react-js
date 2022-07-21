import { WithChildren } from '@xylabs/react-shared'
import { XyoArchivistApi, XyoRemoteArchivist } from '@xyo-network/api'
import { XyoArchivist, XyoMemoryArchivist } from '@xyo-network/archivist'
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
  parent?: XyoArchivist
}

export const MemoryArchivistProvider: React.FC<WithChildren<MemoryArchivistProviderProps>> = ({ parent: parentProp, ...props }) => {
  const { archivist: parent } = useArchivist()
  return <ArchivistProvider archivist={new XyoMemoryArchivist(parentProp ?? parent)} {...props} />
}

export interface ApiArchivistProviderProps {
  required?: boolean
  api: XyoArchivistApi
  archive: string
}

export const RemoteArchivistProvider: React.FC<WithChildren<ApiArchivistProviderProps>> = ({ api, archive, ...props }) => {
  return <ArchivistProvider archivist={new XyoRemoteArchivist(api, archive)} {...props} />
}
