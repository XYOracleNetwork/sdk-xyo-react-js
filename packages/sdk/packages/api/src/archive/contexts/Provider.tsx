import { WithChildren } from '@xylabs/react-shared'
import { useArchiveArchivists } from '@xyo-network/react-node'
import { useState } from 'react'

import { ArchiveContext } from './Context'

export interface ArchiveProviderProps {
  defaultArchive?: string
}

export const ArchiveProvider: React.FC<WithChildren<ArchiveProviderProps>> = ({ defaultArchive, ...props }) => {
  const [archive, setArchive] = useState<string | undefined>(defaultArchive)
  const { archivePayloadArchivist, archiveBoundWitnessArchivist } = useArchiveArchivists(archive)

  return (
    <ArchiveContext.Provider
      value={{ archive: archive ?? defaultArchive, archiveBoundWitnessArchivist, archivePayloadArchivist, provided: true, setArchive }}
      {...props}
    />
  )
}
