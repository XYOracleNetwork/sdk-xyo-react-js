import { ArchivistWrapper } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { usePromise } from '@xyo-network/react-shared'
import { useMemo } from 'react'

import { useNode } from './useNode'

export const useArchiveArchivists = (archiveName?: string, required?: boolean) => {
  const [node] = useNode<MemoryNode>(required)

  const payloadArchivistReq = useMemo(
    () => (archiveName && node ? node?.tryResolveWrapped(ArchivistWrapper, { name: [`${archiveName}[payload]`] }) : undefined),
    [archiveName, node],
  )
  const boundWitnessArchivistReq = useMemo(
    () => (archiveName && node ? node?.tryResolveWrapped(ArchivistWrapper, { name: [`${archiveName}[boundwitness]`] }) : undefined),
    [archiveName, node],
  )

  const [archivePayloadArchivist] = usePromise(payloadArchivistReq, [payloadArchivistReq])
  const [archiveBoundWitnessArchivist] = usePromise(boundWitnessArchivistReq, [boundWitnessArchivistReq])

  return { archiveBoundWitnessArchivist: archiveBoundWitnessArchivist?.shift(), archivePayloadArchivist: archivePayloadArchivist?.shift() }
}
