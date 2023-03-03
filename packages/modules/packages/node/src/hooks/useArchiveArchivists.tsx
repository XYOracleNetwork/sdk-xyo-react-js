import { ArchivistWrapper } from '@xyo-network/archivist'
import { usePromise } from '@xyo-network/react-shared'
import { useCallback, useMemo } from 'react'

import { useMemoryNodeUpdates } from './useMemoryNodeUpdates'
import { useProvidedNode } from './useProvidedNode'

interface UseArchiveArchivists {
  archiveBoundWitnessWrapper: ArchivistWrapper
  archivePayloadWrapper: ArchivistWrapper
}

export const useArchiveArchivistsRaw = (archiveName?: string, refresher?: unknown): UseArchiveArchivists | undefined => {
  const [node] = useProvidedNode(true)

  const buildReq = useCallback(
    (type: 'payload' | 'boundwitness') =>
      (archiveName && node) || refresher
        ? node?.resolveWrapped(ArchivistWrapper, { name: [encodeURIComponent(`${archiveName}[${type}]`)] })
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

export const useArchiveArchivists = (archiveName?: string, refresher?: unknown, refreshAddresses?: string[]) => {
  const { module } = useMemoryNodeUpdates(refreshAddresses)
  const archivists = useArchiveArchivistsRaw(archiveName, refresher ?? module)

  return archivists
}
