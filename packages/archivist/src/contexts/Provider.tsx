import { WithChildren } from '@xylabs/react-shared'
import { XyoApiArchivist, XyoArchivist, XyoArchivistApi, XyoMemoryArchivist } from '@xyo-network/api'
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

export interface ArchivistMemoryProviderProps {
  required?: boolean
  parent?: XyoArchivist
}

export const ArchivistMemoryProvider: React.FC<WithChildren<ArchivistMemoryProviderProps>> = ({ parent: parentProp, ...props }) => {
  const { archivist: parent } = useArchivist()
  return <ArchivistProvider archivist={new XyoMemoryArchivist(parentProp ?? parent)} {...props} />
}

export interface ArchivistApiProviderProps {
  required?: boolean
  api: XyoArchivistApi
  archive: string
}

export const ArchivistApiProvider: React.FC<WithChildren<ArchivistApiProviderProps>> = ({ api, archive, ...props }) => {
  return <ArchivistProvider archivist={new XyoApiArchivist(api, archive)} {...props} />
}
