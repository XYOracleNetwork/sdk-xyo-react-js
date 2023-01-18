import { ArchivistWrapper } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { usePromise } from '@xyo-network/react-shared'
import { useMemo } from 'react'

import { useMemoryNodeUpdates } from './useMemoryNodeUpdates'
import { useNode } from './useNode'

interface UseArchiveArchivists {
  archivePayloadWrapper?: ArchivistWrapper
  archiveBoundWitnessWrapper?: ArchivistWrapper
}

type HookParams = Parameters<typeof useArchiveArchivistsRaw>

export const useArchiveArchivistsRaw = (archiveName?: string, required?: boolean, refresher?: unknown): UseArchiveArchivists => {
  const [node] = useNode<MemoryNode>(required)

  const payloadArchivistReq = useMemo(
    () => (archiveName && node ? node?.tryResolveWrapped(ArchivistWrapper, { name: [encodeURIComponent(`${archiveName}[payload]`)] }) : undefined),
    [archiveName, node],
  )
  const boundWitnessArchivistReq = useMemo(
    () =>
      archiveName && node ? node?.tryResolveWrapped(ArchivistWrapper, { name: [encodeURIComponent(`${archiveName}[boundwitness]`)] }) : undefined,
    [archiveName, node],
  )

  const [archivePayloadWrapper] = usePromise(payloadArchivistReq, [payloadArchivistReq, refresher])
  const [archiveBoundWitnessWrapper] = usePromise(boundWitnessArchivistReq, [boundWitnessArchivistReq, refresher])

  return { archiveBoundWitnessWrapper: archiveBoundWitnessWrapper?.shift(), archivePayloadWrapper: archivePayloadWrapper?.shift() }
}

export const useArchiveArchivists = (...[archive, required, refresher]: HookParams) => {
  const { resolver } = useMemoryNodeUpdates()
  const { archiveBoundWitnessWrapper, archivePayloadWrapper } = useArchiveArchivistsRaw(archive, required, refresher ?? resolver)

  return { archiveBoundWitnessWrapper, archivePayloadWrapper }
}
