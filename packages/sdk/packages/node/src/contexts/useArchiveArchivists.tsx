import { ArchivistWrapper } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { usePromise } from '@xyo-network/react-shared'
import { useMemo } from 'react'

import { useNode } from './useNode'

interface UseArchiveArchivists {
  archivePayloadWrapper?: ArchivistWrapper
  archiveBoundWitnessWrapper?: ArchivistWrapper
}

export const useArchiveArchivists = (archiveName?: string, required?: boolean): UseArchiveArchivists => {
  const [node] = useNode<MemoryNode>(required)

  const payloadArchivistReq = useMemo(
    () => (archiveName && node ? node?.tryResolveWrapped(ArchivistWrapper, { name: [`${archiveName}[payload]`] }) : undefined),
    [archiveName, node],
  )
  const boundWitnessArchivistReq = useMemo(
    () => (archiveName && node ? node?.tryResolveWrapped(ArchivistWrapper, { name: [`${archiveName}[boundwitness]`] }) : undefined),
    [archiveName, node],
  )

  const [archivePayloadWrapper] = usePromise(payloadArchivistReq, [payloadArchivistReq])
  const [archiveBoundWitnessWrapper] = usePromise(boundWitnessArchivistReq, [boundWitnessArchivistReq])

  return { archiveBoundWitnessWrapper: archiveBoundWitnessWrapper?.shift(), archivePayloadWrapper: archivePayloadWrapper?.shift() }
}
