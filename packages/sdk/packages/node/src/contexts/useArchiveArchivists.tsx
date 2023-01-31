import { ArchivistWrapper } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { usePromise } from '@xyo-network/react-shared'
import { useCallback, useMemo } from 'react'

import { useMemoryNodeUpdates } from './useMemoryNodeUpdates'
import { useNode } from './useNode'

interface UseArchiveArchivists {
  archiveBoundWitnessWrapper: ArchivistWrapper
  archivePayloadWrapper: ArchivistWrapper
}

type HookParams = Parameters<typeof useArchiveArchivistsRaw>

export const useArchiveArchivistsRaw = (archiveName?: string, required?: boolean, refresher?: unknown): UseArchiveArchivists | undefined => {
  const [node] = useNode<MemoryNode>(required)

  const buildReq = useCallback(
    (type: 'payload' | 'boundwitness') =>
      (archiveName && node) || refresher
        ? node?.tryResolveWrapped(ArchivistWrapper, { name: [encodeURIComponent(`${archiveName}[${type}]`)] })
        : undefined,
    [archiveName, node, refresher],
  )

  const payloadArchivistReq = useMemo(() => buildReq('payload'), [buildReq])
  const boundWitnessArchivistReq = useMemo(() => buildReq('boundwitness'), [buildReq])

  const [archivePayloadWrapper] = usePromise(payloadArchivistReq, [payloadArchivistReq])
  const [archiveBoundWitnessWrapper] = usePromise(boundWitnessArchivistReq, [boundWitnessArchivistReq])

  const archivists = useMemo(() => {
    if (archiveBoundWitnessWrapper?.[0] && archivePayloadWrapper?.[0]) {
      return {
        archiveBoundWitnessWrapper: archiveBoundWitnessWrapper[0] as ArchivistWrapper,
        archivePayloadWrapper: archivePayloadWrapper[0] as ArchivistWrapper,
      }
    } else {
      return
    }
  }, [archiveBoundWitnessWrapper, archivePayloadWrapper])

  return archivists
}

export const useArchiveArchivists = (...[archive, required, refresher]: HookParams) => {
  const { resolver } = useMemoryNodeUpdates()
  const archivists = useArchiveArchivistsRaw(archive, required, refresher ?? resolver)

  return archivists
}
