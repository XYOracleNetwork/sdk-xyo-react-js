import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { MemoryNode } from '@xyo-network/node'
import { useNode } from '@xyo-network/react-node'
import { useState } from 'react'

import { ArchiveContext } from './Context'

export interface ArchiveProviderProps {
  defaultArchive?: string
}

export const ArchiveProvider: React.FC<WithChildren<ArchiveProviderProps>> = ({ defaultArchive, ...props }) => {
  const [archive, setArchive] = useState<string | undefined>(defaultArchive)
  const [archivePayloadArchivist, setArchivePayloadArchivist] = useState<ArchivistWrapper>()
  const [archiveBoundWitnessArchivist, setArchiveBoundWitnessArchivist] = useState<ArchivistWrapper>()
  const [node] = useNode<MemoryNode>(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const wrappedPayloadArchivist = await node?.tryResolveWrapped(ArchivistWrapper, { name: [`${archive}[payload]`] })
      const wrappedBoundWitnessArchivist = await node?.tryResolveWrapped(ArchivistWrapper, { name: [`${archive}[boundwitness]`] })
      setArchivePayloadArchivist(wrappedPayloadArchivist?.shift())
      setArchiveBoundWitnessArchivist(wrappedBoundWitnessArchivist?.shift())
    },
    [archive, node],
  )

  return (
    <ArchiveContext.Provider
      value={{ archive: archive ?? defaultArchive, archiveBoundWitnessArchivist, archivePayloadArchivist, provided: true, setArchive }}
      {...props}
    />
  )
}
